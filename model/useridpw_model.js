const mongoose = require('mongoose')


let useridpw_schema =  new mongoose.Schema({
   
    duserId: Number,
    dusername: String,
    dpassword:String,
    dprofilepic: String,
    

});

let useridpw_model = mongoose.model('ffsd4',useridpw_schema );
module.exports=useridpw_model;
