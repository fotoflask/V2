const express = require('express')
const multer = require("multer")
const mongoose = require('mongoose')
const fs = require('fs')
const bodyparser = require("body-parser")
const path = require('path')
const { ObjectId } = require('mongodb')
const { stringify } = require('querystring')
const url = 'mongodb://0.0.0.0/Fotoflask'

const app = express()
app.set('view engine', 'ejs');
app.use(express.static("public")); 
app.use(express.static("private"));
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

 
mongoose.connect(url)
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...')
})


app.listen(4000, () => {
    console.log('Server started')
})

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
        .then(user_logged=>{
            if(user_logged){
                res.redirect("home")
            }
            else
            res.status(200).render("signin-signup")
        })
})

app.get("/", (req,res)=>{
    con.collection('session').findOne({dipaddress : req.socket.remoteAddress})
        .then(user_logged=>{
            if(user_logged){
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
        .then(user_logged=>{
            if(user_logged){
                con.collection('UserDetails').findOne({duserId : user_logged.duserId}).then(result=>{
                    doc4 = result
                    console.log("homehere") 
                    //console.log(doc4)
                    mymodel.find({})
                    .sort({ Date: -1 })
                    .then(doc2=>{
                        console.log("inside") 
                        //console.log(doc2) 
                        if(doc2)
                        {
                            console.log("insdhome")  
                            res.render("homepage_s",{user_logged,doc2,doc4})
                        } 
                        
                        else
                        res.render("homepage_s",{userId : user_logged.duserId})
                    })
                })
            }
            else{
                res.redirect("/")
            }
        }) 
    
})

app.post("/home", (req,res)=>{

    mymodel.findById(req.body.like)
    .then((res1)=>{  
        if(res1 && res1.likes.includes(req.body.likeduser)){
            mymodel.findOneAndUpdate(  
                {_id : req.body.like}  ,
                { $inc: { likes_number: -1 },
                $pull: { likes: req.body.likeduser } }, 
                { new: true } 
            )
            .then(function(updatedPicture) {
            res.redirect("/home")
            })
            .catch(function(error) {
            res.status(500).json({ error: error.message });
            });
        }
        else {
            mymodel.findOneAndUpdate(  
                {_id : req.body.like}  ,
                { $inc: { likes_number: +1 },
                $push: { likes: req.body.likeduser } },
                { new: true }
            )
            .then(function(updatedPicture) {
            res.redirect("/home")
            })
            .catch(function(error) {
            res.status(500).json({ error: error.message });
            });
        }
    })
        
  
}) 
    

app.post("/postpage/like", (req,res)=>{
    console.log("FF"+req.body.postid)
    let posturl = "/postpage/"+req.body.postid;
    console.log("GG"+posturl)
    mymodel.findById(req.body.like) 
    .then((res1)=>{  
        if(res1 && res1.likes.includes(req.body.likeduser)){
            mymodel.findOneAndUpdate(  
                {_id : req.body.like}  ,
                { $inc: { likes_number: -1 },
                $pull: { likes: req.body.likeduser } }, 
                { new: true } 
            )
            .then(function(updatedPicture)  {
                res.redirect(posturl )
            })
            .catch(function(error) {   });
        }
        else {
            mymodel.findOneAndUpdate(  
                {_id : req.body.like}  ,
                { $inc: { likes_number: +1 },
                $push: { likes: req.body.likeduser } }, 
                { new: true } 
            )
            .then(function(updatedPicture) {
                res.redirect(posturl)
            }) 
            .catch(function(error) { }); 
        }
    })
    .catch(err=>{  console.error(err)  })
})
   
app.post("/postpage/comment", (req,res)=>{
    console.log("CC"+req.body.commentpostid)
    let posturl = "/postpage/"+req.body.commentpostid;
    console.log("CD"+posturl)
    mymodel.findById(req.body.commentpostid) 
    .then((res1)=>{  
        if(res1){
            mymodel.findOneAndUpdate(  
                {_id : req.body.commentpostid}  ,
                { $inc: { comments_number: +1 },
                $push: { comments: [req.body.currentuser,req.body.comment,new Date()] } },
                { new: true }
            )
            .then(function(updatedPicture)  {
                res.redirect(posturl )
            })
            .catch(function(error) {   });
        }
    })
    .catch(err=>{  console.error(err)  })
})


app.post("/search", (req,res)=>{ 
    let doc4
    console.log("Tag"+req.body.searchinput)
    con.collection('session').findOne({dipaddress : req.socket.remoteAddress})
        .then(user_logged=>{
            if(user_logged){
                con.collection('UserDetails').findOne({duserId : user_logged.duserId}).then(result=>{
                    doc4 = result
                    console.log("homehere") 
                    console.log(doc4)
                    mymodel.find({$or :[ {Tag : { $regex: new RegExp(req.body.searchinput, 'i') } },{ dusername : { $regex: new RegExp(req.body.searchinput, 'i') }},{ dprofilename : { $regex: new RegExp(req.body.searchinput, 'i') }}]})
                    .sort({ Date: -1 })
                    .then(doc2=>{
                        console.log("inside") 
                        console.log(doc2) 
                        if(doc2){
                            console.log("insd")  
                            res.render("homepage_s",{user_logged,doc2,doc4})
                        }                         
                        else
                        res.render("homepage_s",{userId : user_logged.duserId})
                    })
                })
            }
            else{
                res.redirect("/")
            }
        }) 
})

app.get("/createpost", (req,res)=>{
    console.log("createPost")
    res.render("create_post")
})  
  
app.post('/singlepost',upload.single('single_input'),(req,res)=>{
    if(!req.file)res.redirect("/createpost")
    else{
    let doc5
    console.log("HH")
    con.collection('session').findOne({dipaddress : req.socket.remoteAddress})
        .then(user_logged=>{
            con.collection('UserDetails').findOne({duserId : user_logged.duserId}).then(result=>{
                doc5 = result
                console.log(doc5)
                mymodel.create({
                    duserId : user_logged.duserId,
                    dusername : user_logged.dusername,
                    dprofilename : doc5.dprofilename,
                    dprofilepic : doc5.dprofilepic,
                    Date : new Date(),
                    Picture  :  req.file.filename, 
                    Description_of_post  : req.body.description,
                    Tag : req.body.tag.split(" "),
                    likes_number : 0,
                    likes : [""],
                    comments_number : 0,
                    Shares : 0,                
                   })
                    .then((x)=>{  
                    res.redirect("/home")                    
                    })
                    .catch((y)=>{
                    res.redirect("/createpost")
                    })})
            
        })
    }
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

app.get('/postpage/:postid',(req,res)=>{
    const postid = req.params.postid
    console.log("K"+(postid)+"L")
    con.collection('session').findOne({dipaddress : req.socket.remoteAddress})
        .then(user_logged=>{
            if(user_logged){
                mymodel.findOne({ _id: postid }).then(postdata=>{
                    con.collection("UserDetails").findOne({dusername : postdata.dusername}).then(postuserdata=>{
                        //console.log((postdata))
                        console.log("KK")
                        res.render("postpage",{postdata,user_logged,postuserdata})                
                    }) 
                }) 
                .catch(err=>{
                    console.error(err)
                })
                
            }  
            else
            res.redirect("/signin-signup")
        }) 
        .catch((err)=>{
            console.error(err)
        })
    
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
        console.log("done here")
        res.redirect("/home")
    }
    else { 
        console.log("wrong--input")
        res.redirect('/')
    }}) 
    
      
})

app.post("/signin-signup/signup", (req,res)=>{
    adduseraccount(req.body.username,req.body.profilename,req.body.email,req.body.password,req.body.mobilenumber,req.body.dateofbirth, (result)=>{
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

app.get("/buypost/:postid",(req,res)=>{
    console.log("buy")
    con.collection('session').findOne({dipaddress : req.socket.remoteAddress})
        .then(user_logged=>{
            if(user_logged){
                mymodel.findOne({ _id: req.params.postid }).then(postdata=>{
                    res.render("postpayment",{postdata,user_logged});
                })
            }
            else
            res.status(200).render("signin-signup")
        })
})

app.post("/buypost",(req,res)=>{
    console.log("GEER")
    console.log(req.body)
    payment = {
        postowner : req.body.ownerusername,
        postname : req.body.postname,
        postprice : req.body.price,
        postpaiduser : req.body.paidusername,
        paidcardnumber : req.body.cardnumber,
        paidcardholdername : req.body.cardholdername,
        paidcardmonth : req.body.month,
        paidcardyear : req.body.year,
        paidcvvnumber : req.body.cvvnumber
    }
    con.collection('Payments').insertOne(payment)
    .then(()=>{
        const file = path.join(__dirname, '/private/images/PostImages', req.body.postname); // Replace with your file path
        const fileName = req.body.postname;
        res.setHeader('Content-Type', 'jpg/jpeg/png');
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
        const fileStream = fs.createReadStream(file);
        fileStream.pipe(res)
    })
    
})

app.get("/explore",(req,res)=>{
    res.render("explorepage")
})

app.get("/follow",(req,res)=>{
    res.render("layout/follow")
})


app.post('/follow', async (req, res) => {
    console.log(req.body)
    
    try {
        con.collection('session').findOne({dipaddress : req.socket.remoteAddress})
        .then(user_logged=>{
            if(user_logged){
                console.log("follower:"+user_logged.dusername)
                con.collection("UserDetails").findOneAndUpdate({duserId : user_logged.duserId},
                    {$push:{following : req.body.followingusername}})
                .then(()=>{
                    con.collection("UserDetails").findOneAndUpdate({dusername : req.body.followingusername},
                        {$push:{followers : user_logged.dusername},$inc : {dfollowers_count : +1}})
                        .then((foll)=>{
                            console.log(foll)
                        })
                })
                .then(()=>{
                    res.status(200).json({ message: 'Followed successfully!' });
                })
            }
            else
            res.status(200).render("signin-signup")
        })

        
  
      // Send a response to the client with a confirmation
    } catch (err) {
      // Send an error response to the client
      res.status(500).json({ error: 'Failed to follow user.' });
    }
  });


app.post("/logout", (req,res)=>{
    console.log(req.body)
    con.collection('session').deleteOne({dipaddress : req.socket.remoteAddress})
        .then(()=>{
            console.log("loggedout"+req.socket.remoteAddress)
            res.redirect("/")
        })

})

app.get("/profilepage/:username_clicked", (req, res) => {
    const username_clicked = req.params.username_clicked
    con.collection('session').findOne({dipaddress : req.socket.remoteAddress})
        .then(user_logged=>{
            if(user_logged){
                con.collection("UserDetails").findOne({dusername : username_clicked}).then(doc4=>{
                    console.log("A"+username_clicked+"A")
                    console.log("AAAAA"+(doc4.dusername === username_clicked))
                    mymodel.find({dusername : username_clicked}).then(doc5=>{
                        console.log(doc4)
                        console.log(doc5)
                        res.render("profilepage",{user_logged,doc5,doc4})
                    })
                }) 
            }  
            else  
            res.render("signin-signup")
        }) 
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
                    dprofilepic : doc.dprofilepic,
                    dtime : new Date()                 
                };
                con.collection('session')
                    .findOne({dipaddress : ipaddress})
                    .then((sessionfound)=>{
                        if(sessionfound)
                        con.collection('session')
                        .updateOne({dipaddress : ipaddress},{$set:{duserId : doc.duserId,
                            dusername : username}})

                        else con.collection('session').insertOne(nsession)
                    })        
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
 


function adduseraccount(username,profilename,email,password,mobilenumber,DOB, callback){
    let lastuserID = 0;
    con.collection("UserIDpwd").findOne({dusername : username}).then(doc =>{
        if(doc) {console.log("docempty");callback(0);}
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
                dpassword : password,
                dprofilepic : ""
                };
                newUserDetails = {
                duserId : lastuserID,
                dusername : username, 
                dprofilename : profilename,
                demail : email,
                dmobilenumber : mobilenumber,
                dDOB : DOB,
                dprofilepic : "",
                dcoverphoto : "",
                dfollowers_count : 0
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
}