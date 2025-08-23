var {getapplicationmodel}= require("../models/applicant_model.js");
var applicantRef=getapplicationmodel();

function doSaveApplication(req,resp){
    
    console.log(req.body);
    var  applicantobj= new applicantRef(req.body);
    applicantobj
    .save()
    .then((document)=>{
        resp.json({
            status: true,
            doc: document,
            msg: "Application saved successfully"
        });
    })
    .catch((err)=>{
        resp.send(err.message);
    });
}

module.exports={doSaveApplication}