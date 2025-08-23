var { getFranchiseCredentialModel } = require('../models/franchiseCredentialModel.js');
var franchiseeRef = getFranchiseCredentialModel();

var {getapplicationmodel}= require("../models/applicant_model.js");
var applicationRef=getapplicationmodel();

var { getSalesDataModel } = require('../models/sales_Data_Model.js');
var salesRef = getSalesDataModel();

const jwt = require("jsonwebtoken");

function doLogin(req, resp) {
  franchiseeRef
    .findOne({ email: req.body.email, password: req.body.password })
    .then((doc) => {
      if (doc == null) {
        resp.json({
          staat: false,
          msg: "Invalid Credentials",
        });
        return;
      }
      let token = jwt.sign({ uid: req.body.email }, process.env.SEC_KEY, {
        expiresIn: "15m",
      });
      resp.json({
        staat: true,
        doc: doc,
        token: token,
      });
    })
    .catch((err) => {
      console.error("Login error:", err);
      resp.status(500).send(err.message);
    });
}

function getFranchiseeProfile(req, resp) {
  applicationRef
    .find({ email: req.body.txtemail })
    .then((doc) => {
      resp.json({
        doc: doc,
        stat: true,
        msg: "Franchisee Profile",
      });
    })
    .catch((err) => {
      console.error("Get Franchisee Profile error:", err);
      resp.status(500).send(err.message);
    });
}

function getFranchiseeName(req, resp) {
  applicationRef
    .findOne({ email: req.body.txtemail })
    .then((doc) => {
      resp.json({
        stat: true,
        doc: doc.fname + " " + doc.lname,
      });
    })
    .catch((err) => {
      console.error("Get Franchisee Name error:", err);
      resp.status(500).send(err.message);
    });
}

function doChkIfSalesExist(req, resp) {
  //console.log(req.body);
  salesRef
    .findOne({ email: req.body.email, dof: req.body.date })
    .then((doc) => {
      if (doc === null) {
        resp.json({ stat: false });
      } else {
        resp.json({ stat: true });
      }
    })
    .catch((err) => {
      resp.send(err.message);
    });
}

function addSales(req, resp) {
  // console.log(req.body);
  let obj = new salesRef({
    email: req.body.email,
    customersVisited: req.body.customersVisited,
    totalSales: req.body.totalSales,
    dof: req.body.dof, 
  });
  obj
    .save()
    .then((doc) => {
      resp.json({
        stat: true,
        msg: "Sales entry added successfully",
      });
    })
    .catch((err) => {
      console.error("Error adding sales entry:", err);
      resp.status(500).send(err.message);
    });
}

async function getFilteredSales(req, resp) {
  const { email, start, end } = req.body;
  try {
    const sales = await salesRef.find({
      email: email,
      dof: { $gte: new Date(start), $lte: new Date(end) },
    }).sort({ dof: 1 });

    resp.json({
      stat: true,
      doc: sales,
      msg: "Sales data fetched successfully",
    });
  } catch (err) {
    console.error("Error fetching filtered sales data:", err);
    resp.status(500).send(err.message);
  }
}
async function getSalesData(req, resp) {
  const { email, start, end, period } = req.body;
  try {
    let match = { email };
    if (start && end) {
      match.dof = { $gte: new Date(start), $lte: new Date(end) };
    }

    let pipeline = [];
    
    // First add the match stage
    pipeline.push({ $match: match });

    // Add grouping stage based on period
    if (period === "week") {
      pipeline.push({
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%V", // ISO week year and week number
              date: "$dof"
            }
          },
          firstDay: { $min: "$dof" },
          totalSales: { $sum: "$totalSales" }
        }
      });
    } else if (period === "month") {
      pipeline.push({
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m",
              date: "$dof"
            }
          },
          totalSales: { $sum: "$totalSales" }
        }
      });
    } else if (period === "year") {
      pipeline.push({
        $group: {
          _id: { $year: "$dof" },
          totalSales: { $sum: "$totalSales" }
        }
      });
    } else {
      // specific dates
      pipeline.push({
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$dof"
            }
          },
          totalSales: { $sum: "$totalSales" }
        }
      });
    }

    // Add sort stage
    pipeline.push({ $sort: { "_id": 1 } });

    const sales = await salesRef.aggregate(pipeline);

    const result = sales.map(s => ({
      label: s._id,
      sales: s.totalSales,
      firstDay: s.firstDay // Only present for weekly grouping
    }));

    resp.json({ 
      stat: true, 
      sales: result.map(r => r.sales),
      labels: result.map(r => r.label),
      firstDays: result.map(r => r.firstDay) // Only used for weekly grouping
    });
  } catch (err) {
    console.error("Error fetching sales data:", err);
    resp.status(500).send(err.message);
  }
}
async function getCalendarData(req, resp) {
  const { email } = req.body;
  try {
    // Fetch submitted dates from your database
    const submittedDates = await salesRef.find({ email }).distinct('dof');
    
    // Determine missing dates (for example, dates within the current month that are not submitted)
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const missingDates = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dateString = date.toISOString().split('T')[0];
      if (!submittedDates.includes(dateString) && date <= new Date()) {
        missingDates.push(dateString);
      }
    }

    resp.json({ submittedDates, missingDates });
  } catch (err) {
    console.error("Error fetching calendar data:", err);
    resp.status(500).send(err.message);
  }
}

module.exports = {
  doLogin,
  getFranchiseeProfile,
  getFranchiseeName,
  addSales,
  getFilteredSales,
  doChkIfSalesExist,
  getSalesData,
  getCalendarData
};