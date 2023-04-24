const mongoose = require('mongoose')


let payment_schema =  new mongoose.Schema({
    postowner : String,
    postname : String,
    postprice : String,
    postpaiduser : String,
    paidcardnumber : String,
    paidcardholdername : String,
    paidcardmonth : String,
    paidcardyear : String,
    paidcvvnumber : String,
});

let payment_model = mongoose.model('ffsd4',payment_schema);
module.exports=payment_model;
