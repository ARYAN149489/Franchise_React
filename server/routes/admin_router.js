var express= require('express');
var obj=require('../controllers/admin_controller.js');

var router=express.Router();

router.get("/allApplicants",obj.getAllApplications);
router.post("/acceptapplicant",obj.doAcceptApplicant);
router.post("/rejectApplicant", obj.doRejectApplicant);
router.post("/grantApplicant", obj.doGrantApplication);
router.post("/saveFranchiseCred", obj.doSaveFranchiseCred);

module.exports=router;

