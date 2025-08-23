var mongoose = require('mongoose');

function getSalesDataModel(){
   if(mongoose.models.sales_data){
         return mongoose.models.sales_data;
   } 
   var schemaobj=mongoose.Schema;
   var sales_schema=new schemaobj(
    {
      email: { type: String, required: true },
      customersVisited: { type: Number, required: true },
      totalSales: { type: Number, required: true },
      dof: { type: Date },
   },
   { versionKey: false }
    );
    var getSalesDataModel=mongoose.model("sales_data",sales_schema);
    return getSalesDataModel;
}
module.exports ={getSalesDataModel};