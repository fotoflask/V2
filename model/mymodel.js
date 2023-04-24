const mongoose = require('mongoose')


let myschema =  new mongoose.Schema({
    duserId : Number,    
    dusername : String,
    dprofilename : String,
    dprofilepic : String,
    postid : Number,
    Date : Date,
    Picture:{
        type:String,
    },
    Description_of_post : String,
    Tag : [String],
    likes_number : Number,
    likes : [String],
    comments : [[String],[String]],
    comments_number : Number,
    Shares : Number
});

let mymodel = mongoose.model('ffsd1',myschema);
module.exports=mymodel;
