const mongoose = require('mongoose')


let userdetails_schema =  new mongoose.Schema({
  
    duserId: Number,
    dusername: String,
    dprofilename: String,
    demail:String,
    dmobilenumber:String,
    dDOB:String,
    dprofilepic: String,
    dcoverphoto:String,
    dfollowers_count: Number,

});

let userdetails_model = mongoose.model('ffsd3',userdetails_schema);
module.exports=userdetails_model;
