var express=require('express');
var franchiseRouter=express.Router();
var obj=require('../controllers/franchise_controller.js');

franchiseRouter.post('/login',obj.doLogin);
franchiseRouter.post(
    "/franchiseeProfile",
    obj.getFranchiseeProfile
);
franchiseRouter.post(
    "/chkSalesIfExist",
    express.json(),
    obj.doChkIfSalesExist
);
  
franchiseRouter.post(
  "/addSales",
  express.json(),
  obj.addSales
);
  
franchiseRouter.post(
  "/getfilteredSales",
  express.json(),
  obj.getFilteredSales
);
franchiseRouter.post("/get_name",obj.getFranchiseeName);
franchiseRouter.post("/getSalesData", express.json(), obj.getSalesData);
franchiseRouter.post("/getCalendarData", express.json(), obj.getCalendarData);

module.exports=franchiseRouter;