const express = require('express')
const multer = require("multer")
const mongoose = require('mongoose')
const bodyparser = require("body-parser")
const path = require('path')
const url = 'mongodb://0.0.0.0/Fotoflask'

const app = express()
app.set('view engine', 'ejs');
app.use(express.static("public")); 
app.use(express.static("private"));
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const profilepic = ["/images/ProfilePhotos/poojyanth.png","/images/ProfilePhotos/poojyanth.png","/images/ProfilePhotos/pavan.png","/images/profilephotos/poojyanth.png","/images/profilephotos/abhi.jpg","/images/profilephotos/sravan.png"]
const coverphoto = ["/images/coverphotos/basketball_court-2.png","/images/coverphotos/basketball_court-2.png","/images/coverphotos/basketball_court-2.png","/images/coverphotos/basketball_court-2.png","/images/coverphotos/basketball_court-2.png","/images/coverphotos/basketball_court-2.png"]
const postnumber = [6]
const imagesrc= ["/images/postimages/anther.png","/images/postimages/basketball_court-2.png","/images/postimages/IMG20221231094849-1@0.5x.png","/images/postimages/orangeflower.png","/images/postimages/spider-1.jpg","/images/postimages/pinkflower_new-1-signed.png"]
const post_username = ["Poojyanth Reddy","Poojvth Reddy","pavan","Poojyanth Reddy","abhiram145","sravan"]
const user_id = ["poojyanth_reddy","poojyanth_reddy","saipavan","poojyanth_reddy","abhiram145","sravan"]
const likes = [300,250,230,500,100,532]
const comments = [30,20,23,50,10,53]

mongoose.connect(url)
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...')
})


app.listen(4000, () => {
    console.log('Server started')
})

let myschema =  new mongoose.Schema({

    // Date_of_upload : Date(),
    duserId : Number,    
    dusername : String,
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
    comments : [String],
    comments_number : Number,
    Shares : Number
});


let mymodel = mongoose.model('table',myschema);

let storage = multer.diskStorage({

    destination:'./private/images/postimages',
     filename:(req,file,cb)=>{
        cb(null,Date.now()+file.originalname)
     }

})


let upload =multer({
    storage:storage,
    fileFilter:(req,file,cb)=>{

        if(
 
            file.mimetype == 'image/jpeg' ||
            file.mimetype == 'image/jpg' ||
            file.mimetype == 'image/png' ||
            file.mimetype == 'image/gif'

        ){
               cb(null,true);
        }else{

            cb(null,false);
            cb(new Error('ONLY IMAGES ARE ALLOWED TO BE UPLOADED'));


        }

    }
})






app.get("/signin-signup", (req,res)=>{
    con.collection('session').findOne({dipaddress : req.socket.remoteAddress})
        .then(doc3=>{
            if(doc3){
                res.redirect("home")
            }
            else
            res.status(200).render("signin-signup")
        })
})

app.get("/", (req,res)=>{
    con.collection('session').findOne({dipaddress : req.socket.remoteAddress})
        .then(doc3=>{
            if(doc3){
                res.redirect("home")
            }
            else
            res.status(200).render("signin-signup")
        })
})

app.get("/homepage", (req,res)=>{
        console.log(req.query.username+"BBBB")    
        if(req.query.result == 1)
        res.status(200).render("homepage",{profilepic: profilepic,likes: likes, imagesrc : imagesrc, post_username: post_username,postnumber: postnumber,log_username: req.query.username,result: req.query.result})
        else 
        res.redirect('signin-signup')
})

app.get("/home", (req,res)=>{
    let doc4
    con.collection('session').findOne({dipaddress : req.socket.remoteAddress})
        .then(doc3=>{
            if(doc3){
                con.collection('UserDetails').findOne({duserId : doc3.duserId}).then(result=>{
                    doc4 = result
                    console.log("homehere") 
                    console.log(doc4)
                    mymodel.find({})
                    .sort({ Date: -1 })
                    .then(doc2=>{
                        console.log("inside") 
                        console.log(doc2) 
                        if(doc2)
                        {
                            console.log("insd") 
                            res.render("homepage_s",{userId : doc3.duserId,doc2,doc4})
                        } 
                        
                        else
                        res.render("homepage_s",{userId : doc3.duserId})
                    })
                })
            }
            else{
                res.redirect("/")
            }
        }) 
    
})

app.post("/home", (req,res)=>{
    console.log(req.body.like)
    mymodel.findById(req.body.like)
    .then((res1)=>{  
        if(res1 && res1.likes.includes(req.body.likeduser)){
            mymodel.findOneAndUpdate(  
                {_id : req.body.like}  ,
                { $inc: { likes_number: -1 },
                $pull: { likes: req.body.likeduser } }, // Increment like count by 1
                { new: true } // Return the updated document
            )
            .then(function(updatedPicture) {
            // Send response with updated picture data
            res.redirect("/home")
            })
            .catch(function(error) {
            // Handle error and send response
            res.status(500).json({ error: error.message });
            });
        }
        else {
            mymodel.findOneAndUpdate(  
                {_id : req.body.like}  ,
                { $inc: { likes_number: +1 },
                $push: { likes: req.body.likeduser } }, // Increment like count by 1
                { new: true } // Return the updated document
            )
            .then(function(updatedPicture) {
            // Send response with updated picture data
            res.redirect("/home")
            })
            .catch(function(error) {
            // Handle error and send response
            res.status(500).json({ error: error.message });
            });
        }
    })
        
  
})

app.get("/createpost", (req,res)=>{
    console.log("createPost")
    res.render("create_post")
})
 
app.post('/singlepost',upload.single('single_input'),(req,res)=>{
    // req.file
    let doc5
    console.log("HH")
    con.collection('session').findOne({dipaddress : req.socket.remoteAddress})
        .then(doc3=>{
            con.collection('UserDetails').findOne({duserId : doc3.duserId}).then(result=>{
                doc5 = result
                console.log(doc5)
                mymodel.create({
                    duserId : doc3.duserId,
                    dusername : doc3.dusername,
                    dprofilepic : doc5.dprofilepic,
                    Date : new Date(),
                    Picture  :  req.file.filename, 
                    Description_of_post  : req.body.description,
                    Tag : req.body.tag.split(" "),
                    likes_number : 0,
                    comments_number : 0,
                    Shares : 0,                
                   })
                    .then((x)=>{ 
    
                    res.redirect("/home")
                    
                    })
                    .catch((y)=>{
                    console.log(y)
                    })})
            
        })
    
    //res.send(req.file.filename);
})


app.get('/contact/:username',(req,res)=>{
    const post_username_received = req.params.username
    console.log("K"+post_username_received+"B")
    console.log("H")    
    let postnumber_res = 0;
    let imagesrc_res = []    ;
    let like_res =[]
    let profilepic_res
    let coverphoto_res
    let accountfound = 0
    for(let i = 0; i < post_username.length; i++){
        if(post_username[i] == post_username_received)
        {postnumber_res = postnumber_res + 1
        profilepic_res = profilepic[i]
        coverphoto_res = coverphoto[i]
        user_id_res = user_id[i]
        imagesrc_res.push(imagesrc[i])
        like_res.push(likes[i])
        accountfound = 1}
    }
    if(accountfound==1)
    res.render("contact",{profilepic: profilepic_res, user_id: user_id_res, postnumber: postnumber_res,user_name:post_username_received})
})

app.get('/postpage/:logusername',(req,res)=>{
    const post_username_received = req.params.username
    const logusername = req.params.logusername
    const postimage = req.params.postimage
    console.log("K"+post_username_received+"B")
    console.log("H")    
    let profilepic_res
    let like
    let comment
    let coverphoto_res
    let accountfound = 0
    for(let i = 0; i < post_username.length; i++){
        if(post_username[i] == post_username_received)
        {    if(imagesrc == imagesrc[i])
                {
        profilepic_res = profilepic[i]
        user_id_res = user_id[i]
        like = (likes[i])
        comment = comments[i]
        accountfound = 1}
    }}
    
    res.render("postpage",{log_username:logusername,result : 1})
})

app.get('/settingspage/:username', (req,res)=>{
    const post_username_received = req.params.username
    console.log("K"+post_username_received+"B")
    console.log("H")    
    let postnumber_res = 0;
    let imagesrc_res = []    ;
    let like_res =[]
    let profilepic_res
    let coverphoto_res
    let accountfound = 0
    for(let i = 0; i < post_username.length; i++){
        if(post_username[i] == post_username_received)
        {postnumber_res = postnumber_res + 1
        profilepic_res = profilepic[i]
        coverphoto_res = coverphoto[i]
        user_id_res = user_id[i]
        imagesrc_res.push(imagesrc[i]) 
        like_res.push(likes[i])
        accountfound = 1}
    }
    if(accountfound==1)
    res.render("settingspage",{profilepic: profilepic_res, user_id: user_id_res, postnumber: postnumber_res,user_name:post_username_received})
    else res.redirect("/homepage?username=" + req.body.log_username + "&result=" + 1);
})

app.post("/signin-signup/signin", (req,res)=>{
    console.log(req.socket.remoteAddress)
    console.log(req.body.username+" AAAA "+req.body.password)
    checkpassword(req.socket.remoteAddress,req.body.username,req.body.password, (result) => {
        console.log("Bl"+result)
    if(result ==1){
    //res.status(200).render("homepage",{profilepic: profilepic,likes: likes, imagesrc : imagesrc, post_username: post_username,postnumber: postnumber,log_username: req.body.username,result: result})
        console.log("done here")
        // res.redirect("/homepage?username=" + req.body.username + "&result=" + result);
        res.redirect("/home")
    }
    //,{profilepic: profilepic,likes: likes, imagesrc : imagesrc, post_username: post_username,postnumber: postnumber,log_username: req.body.Email,log_password : req.body.password})
    else { 
        console.log("wrong--input")
        res.redirect('/')
    }}) 
    
      
})

app.post("/signin-signup/signup", (req,res)=>{
    adduseraccount(req.body.username,req.body.email,req.body.password,req.body.mobilenumber,req.body.dateofbirth, (result)=>{
        console.log("Aqweqw"+result)
        if(result==1){
            res.redirect('/signin-signup')
        }
        else {
            res.redirect('/signin-signup')
            console.log("signup failed")
        }
    })
    
})

app.get("/profilepage/:post_username", (req, res) => {
    const post_username_received = req.params.post_username
    console.log("K"+post_username_received+"B")
    console.log("H")    
    let postnumber_res = 0;
    let imagesrc_res = []    ;
    let like_res =[]
    let profilepic_res
    let coverphoto_res
    let accountfound = 0
    for(let i = 0; i < post_username.length; i++){
        if(post_username[i] == post_username_received)
        {postnumber_res = postnumber_res + 1
        profilepic_res = profilepic[i]
        coverphoto_res = coverphoto[i]
        user_id_res = user_id[i]
        imagesrc_res.push(imagesrc[i])
        like_res.push(likes[i])
        accountfound = 1}
    }
    if(accountfound==1)
    res.render("profilepage",{profilepic: profilepic_res,coverphoto: coverphoto_res,likes: like_res, user_id: user_id_res, imagesrc: imagesrc_res, postnumber: postnumber_res,comments:comments, user_name:post_username_received})
    else res.redirect("/homepage?username=" + req.body.log_username + "&result=" + 1);
 })

//Add specific path for the url
app.post("/profilepage", (req, res) => {
    console.log("A")
    const post_username_received = req.query.post_username
    let postnumber_res = []
    let imagesrc_res = []    
    let like_res =[]
    let profilepic_res
    for(let i = 0; i < post_username.length; i++){
        if(post_username[i] == post_username_received)
        postnumber_res.push(i)
        profilepic_res = profilepic[i]
        user_id_res = user_id[i]
        imagesrc_res.push(imagesrc[i])
        like_res.push(likes[i]) 
    }
    res.render('profilepage',{profilepic: profilepic_res,likes: like_res, user_id: user_id_res, imagesrc: imagesrc_res})
 })


function checkpassword(ipaddress,username,password,callback){
    console.log("HELLO")
    con.collection('UserIDpwd')
        .findOne({dusername: username})
        .then(doc =>{
            console.log(doc);
            if(doc.dpassword === password){
                nsession = {
                    dipaddress : ipaddress,
                    duserId : doc.duserId,
                    dusername : username,                    
                };
                con.collection('session')
                    .insertOne(nsession)        
                    .catch((err)=>{
                    console.error(err);
                callback(0);
            })
                callback(1);
            }               
            
            else callback(0)
        })
        .catch((err)=>{
            console.error(err);
            callback(0);
        })        
 }
 


function adduseraccount(username,email,password,mobilenumber,DOB, callback){
    let lastuserID = 0;
    con.collection("UserIDpwd").findOne({dusername : username}).then(doc =>{
        if(doc) callback(0);
        else{
            con.collection("UserIDpwd")
                .findOne({}, {sort: {duserId: -1}})
                .then( doc => {
                lastuserID = doc ? doc.duserId : 0;
                console.log(doc)
                lastuserID +=1;
                console.log(lastuserID)
                console.log(username,email,password,mobilenumber,DOB)
            
                newUserpwd = {
                duserId : lastuserID,
                dusername : username,
                dpassword : password
                };
                newUserDetails = {
                duserId : lastuserID,
                dusername : username, 
                demail : email,
                dmobilenumber : mobilenumber,
                dDOB : DOB,
                dprofilepic : "",
                dcoverphoto : ""
            };
            
            
            con.collection('UserIDpwd')
                .insertOne(newUserpwd)                
                .then(()=>{
                    con.collection('UserDetails')
                    .insertOne(newUserDetails)        
                    .catch((err)=>{
                        console.error(err);
                        callback(0);
                    })
                })
                .then(()=>{
                    callback(1);
                })
                .catch((err)=>{
                    console.error(err);
                    callback(0);
                })
                
                })
        }
    })
    //callback(1);
    
}


    
    
    //  console.log(rows.password)
    //  console.log(rows.find(row => row.id === 1).password)
//  db.close((err) => {
//     if (err) {
//       return console.error(err.message);
//     }
//   });