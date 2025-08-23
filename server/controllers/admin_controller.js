var {getapplicationmodel} = require("../models/applicant_model.js");
var applicantRef=getapplicationmodel();

var {nanoid} = require("nanoid");
nanoidd=nanoid;
var {getFranchiseCredentialModel}=require("../models/franchiseCredentialModel.js");
var franchiseRef=getFranchiseCredentialModel();
function getAllApplications(req,resp){
    applicantRef
    .find()
    .then((doc) => {
      resp.json({
        doc: doc,
        status: true,
      });
    })
    .catch((err) => {
      resp.send(err.message);
    });
}

function doAcceptApplicant(req,resp){
    applicantRef
    .updateOne({ txtemail:req.body.email},{ $set : {status:1}})
    .then((doc) => {
        resp.json({
            msg: "Applicant accepted",
            stat:true
        });
    })
    .catch((err) => {
        resp.send(err.message);
    });
}

function doRejectApplicant(req,resp){
  applicantRef
  .updateOne({txtemail: req.body.email},{$set:{status:3}})
  .then((doc)=>{
    resp.json({
      msg:"Application rejected",
      stat:true,
    });
  })
  .catch((err)=>{
    resp.send(err.message);
  });
}

function doGrantApplication(req,resp){
  applicantRef
  .updateOne({txtemail: req.body.email},{$set:{status:2}})
  .then((doc)=>{
    resp.json({
      msg:"Franchise Granted",
      stat:true
    });
  })
  .catch((err)=>{
    resp.send(err.message);
  });
}

function doSaveFranchiseCred(req,resp){
  var pwd=nanoidd(10);

  var franchise_Collection=new franchiseRef({
    email:req.body.email,
    password:pwd
  });
  franchise_Collection
  .save()
  .then((doc)=>{
    resp.json({
      pwd:pwd,
      msg:"Franchise Credentials Saved",
      statt:true
    });
  })
  .catch((err)=>{
    resp.send(err.message);
  });
}

module.exports ={getAllApplications,
  doAcceptApplicant,
  doRejectApplicant,
  doGrantApplication,
  doSaveFranchiseCred
};