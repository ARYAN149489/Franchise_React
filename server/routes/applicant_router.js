var express = require("express");
var obj=require("../controllers/applicant_controller.js");

var router=express.Router();

router.post("/saveFranApp",obj.doSaveApplication);

module.exports= router;