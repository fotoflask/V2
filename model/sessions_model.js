const mongoose = require('mongoose')


let sessions_schema =  new mongoose.Schema({
    dipaddress:String,
    duserId: Number,
    dusername: String,
    dprofilepic: String,
    dtime: Date,

});

let sessions_model = mongoose.model('ffsd2',sessions_schema);
module.exports=sessions_model;
