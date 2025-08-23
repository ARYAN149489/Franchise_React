var mongoose = require('mongoose');
function getFranchiseCredentialModel(){
    if(mongoose.models.franchise_Credentials){
        return mongoose.models.franchise_Credentials;
    }
    var schemaobj=mongoose.Schema;
    var franchiseSchema = new schemaobj(
        {
            email:{type: String, required: true, unique: true, index: true},
            password:{type: String, required: true}
        },
        {versionKey: false}
    );

    var franchiseCredModel=mongoose.model("franchise_Credentials",franchiseSchema);
    return franchiseCredModel;
}

module.exports ={getFranchiseCredentialModel};