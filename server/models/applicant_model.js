var mongoose = require('mongoose');

function getapplicationmodel(){
    if(mongoose.models.applicants){
        return mongoose.models.applicants;
    }
    var schemaObj=mongoose.Schema;
    var applicantSchema = new schemaObj(
        {
            fname: String,
            lname: String,
            txtemail:{ type: String, required: true, index: true, unique: true },
            phoneno: String,
            address: String,
            exisbusiness: String,
            siteloc: String,
            city: String,
            pincode: String,
            area: String,
            floor: String,
            ownership: String,
            status: {type: Number,default:0},
            doa: { type: Date, default: new Date() }
        },
        { versionKey: false }
    );
    var applicantModel= mongoose.model('applicants',applicantSchema);
    return applicantModel;
}

module.exports= {getapplicationmodel}