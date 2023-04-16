// const express = require("express")
// const bodyparser = require("body-parser")
// const sqlite3 = require('sqlite3').verbose()


// let sql

// const db = new sqlite3.Database('private/Database/fotoflask.db',sqlite3.OPEN_READWRITE, (err)=>{
//     if(err) return console.error(err.message);
// });


// const app = express()
// const PORT = 3000
// app.set('view engine', 'ejs');

// //For static things to be usedf
// app.use(express.static("public")); 
// app.use(express.static("private"));
// app.use(bodyparser.urlencoded({extended: true}));

// app.listen(PORT, () => {
//     console.log(`Server Running at ${PORT}`)
// })

// const email = "poojyanth@gmail.com"
// const pwd = "poojyanth"


// const profilepic = ["/images/ProfilePhotos/poojyanth.png","/images/ProfilePhotos/poojyanth.png","/images/ProfilePhotos/pavan.png","/images/profilephotos/poojyanth.png","/images/profilephotos/abhi.jpg","/images/profilephotos/sravan.png"]
// const coverphoto = ["/images/coverphotos/basketball_court-2.png","/images/coverphotos/basketball_court-2.png","/images/coverphotos/basketball_court-2.png","/images/coverphotos/basketball_court-2.png","/images/coverphotos/basketball_court-2.png","/images/coverphotos/basketball_court-2.png"]
// const postnumber = [6]
// const imagesrc= ["/images/postimages/anther.png","/images/postimages/basketball_court-2.png","/images/postimages/IMG20221231094849-1@0.5x.png","/images/postimages/orangeflower.png","/images/postimages/spider-1.jpg","/images/postimages/pinkflower_new-1-signed.png"]
// const post_username = ["Poojyanth Reddy","Poojvth Reddy","pavan","Poojyanth Reddy","abhiram145","sravan"]
// const user_id = ["poojyanth_reddy","poojyanth_reddy","saipavan","poojyanth_reddy","abhiram145","sravan"]
// const likes = [300,250,230,500,100,532]
// const comments = [30,20,23,50,10,53]


// //Basic Send request and response, send html element 
// // app.get("/", (req,res)=>{
// //     res.status(200).send("<h2>What the fuck</h2>")
// // })


// //Send a ejs file (static) as response
// app.get("/signin-signup", (req,res)=>{
//     res.status(200).render("signin-signup")
// })

// app.get("/", (req,res)=>{
//     res.status(200).render("signin-signup")
// })

// app.get("/homepage", (req,res)=>{
//     console.log(req.query.username+"BBBB")
    
//         if(req.query.result == 1)
//         res.status(200).render("homepage",{profilepic: profilepic,likes: likes, imagesrc : imagesrc, post_username: post_username,postnumber: postnumber,log_username: req.query.username,result: req.query.result})
//         else 
//         res.redirect('signin-signup')
// })

// app.get('/contact/:username',(req,res)=>{
//     const post_username_received = req.params.username
//     console.log("K"+post_username_received+"B")
//     console.log("H")    
//     let postnumber_res = 0;
//     let imagesrc_res = []    ;
//     let like_res =[]
//     let profilepic_res
//     let coverphoto_res
//     let accountfound = 0
//     for(let i = 0; i < post_username.length; i++){
//         if(post_username[i] == post_username_received)
//         {postnumber_res = postnumber_res + 1
//         profilepic_res = profilepic[i]
//         coverphoto_res = coverphoto[i]
//         user_id_res = user_id[i]
//         imagesrc_res.push(imagesrc[i])
//         like_res.push(likes[i])
//         accountfound = 1}
//     }
//     if(accountfound==1)
//     res.render("contact",{profilepic: profilepic_res, user_id: user_id_res, postnumber: postnumber_res,user_name:post_username_received})
// })

// app.get('/postpage/:logusername',(req,res)=>{
//     const post_username_received = req.params.username
//     const logusername = req.params.logusername
//     const postimage = req.params.postimage
//     console.log("K"+post_username_received+"B")
//     console.log("H")    
//     let profilepic_res
//     let like
//     let comment
//     let coverphoto_res
//     let accountfound = 0
//     for(let i = 0; i < post_username.length; i++){
//         if(post_username[i] == post_username_received)
//         {    if(imagesrc == imagesrc[i])
//                 {
//         profilepic_res = profilepic[i]
//         user_id_res = user_id[i]
//         like = (likes[i])
//         comment = comments[i]
//         accountfound = 1}
//     }}
    
//     res.render("postpage",{log_username:logusername,result : 1})
// })

// app.get('/settingspage/:username', (req,res)=>{
//     const post_username_received = req.params.username
//     console.log("K"+post_username_received+"B")
//     console.log("H")    
//     let postnumber_res = 0;
//     let imagesrc_res = []    ;
//     let like_res =[]
//     let profilepic_res
//     let coverphoto_res
//     let accountfound = 0
//     for(let i = 0; i < post_username.length; i++){
//         if(post_username[i] == post_username_received)
//         {postnumber_res = postnumber_res + 1
//         profilepic_res = profilepic[i]
//         coverphoto_res = coverphoto[i]
//         user_id_res = user_id[i]
//         imagesrc_res.push(imagesrc[i])
//         like_res.push(likes[i])
//         accountfound = 1}
//     }
//     if(accountfound==1)
//     res.render("settingspage",{profilepic: profilepic_res, user_id: user_id_res, postnumber: postnumber_res,user_name:post_username_received})
//     else res.redirect("/homepage?username=" + req.body.log_username + "&result=" + 1);
// })

// app.post("/signin-signup/signin", (req,res)=>{
//     console.log(req.body.username+" AAAA "+req.body.password)
//     checkpassword(req.body.username,req.body.password, (result) => {
//         console.log("B"+result)
//     if(result ==1)
//     //res.status(200).render("homepage",{profilepic: profilepic,likes: likes, imagesrc : imagesrc, post_username: post_username,postnumber: postnumber,log_username: req.body.username,result: result})
//     res.redirect("/homepage?username=" + req.body.username + "&result=" + result);
//     //,{profilepic: profilepic,likes: likes, imagesrc : imagesrc, post_username: post_username,postnumber: postnumber,log_username: req.body.Email,log_password : req.body.password})
//     else {
//         console.log("wrong input")
//         res.redirect('/')
//     }})
    
    
// })

// app.post("/signin-signup/signup", (req,res)=>{
//     adduseraccount(req.body.username,req.body.email,req.body.password,req.body.mobilenumber,req.body.dateofbirth, (result)=>{
//         console.log("Aqweqw"+result)
//         if(result==1){
//             res.redirect('/signin-signup')
//         }
//         else {
//             console.log("signup failed")
//         }
//     })
    
// })

// app.get("/profilepage/:post_username", (req, res) => {
//     const post_username_received = req.params.post_username
//     console.log("K"+post_username_received+"B")
//     console.log("H")    
//     let postnumber_res = 0;
//     let imagesrc_res = []    ;
//     let like_res =[]
//     let profilepic_res
//     let coverphoto_res
//     let accountfound = 0
//     for(let i = 0; i < post_username.length; i++){
//         if(post_username[i] == post_username_received)
//         {postnumber_res = postnumber_res + 1
//         profilepic_res = profilepic[i]
//         coverphoto_res = coverphoto[i]
//         user_id_res = user_id[i]
//         imagesrc_res.push(imagesrc[i])
//         like_res.push(likes[i])
//         accountfound = 1}
//     }
//     if(accountfound==1)
//     res.render("profilepage",{profilepic: profilepic_res,coverphoto: coverphoto_res,likes: like_res, user_id: user_id_res, imagesrc: imagesrc_res, postnumber: postnumber_res,comments:comments, user_name:post_username_received})
//     else res.redirect("/homepage?username=" + req.body.log_username + "&result=" + 1);
//  })

// //Add specific path for the url
// app.post("/profilepage", (req, res) => {
//     console.log("A")
//     const post_username_received = req.query.post_username
//     let postnumber_res = []
//     let imagesrc_res = []    
//     let like_res =[]
//     let profilepic_res
//     for(let i = 0; i < post_username.length; i++){
//         if(post_username[i] == post_username_received)
//         postnumber_res.push(i)
//         profilepic_res = profilepic[i]
//         user_id_res = user_id[i]
//         imagesrc_res.push(imagesrc[i])
//         like_res.push(likes[i]) 
//     }
//     res.render('profilepage',{profilepic: profilepic_res,likes: like_res, user_id: user_id_res, imagesrc: imagesrc_res})
//  })


// //  let username = "poojyanth"
// //  let password = "poojyanth"
// //  checkpassword(username,password);

// function checkpassword(username,password,callback){
//     console.log("HELLO")
//  sql = `select * from user_password where username = ? LIMIT 1`;
//  db.get(sql,[username], (err,rows)=> {
//     console.log(rows)
//     if (rows && rows.password === password) {
//         callback(1) ; // return 1 if password matches
//       } 
//       else {
//         callback(0); // return 0 if password doesn't match
//       }
//     })}


// function adduseraccount(username,email,password,mobilenumber,DOB, callback){
//     console.log(username,email,password,mobilenumber,DOB)
//     sql = `insert into user_password(username,password) values(?,?)`
//     db.run(sql,[username,password],(err)=>{
//         if(err) {
//             console.error(err.message);
//             callback(0);
//         }
//     })
//     sql = `insert into user_details(username, email, mobilenumber, DOB, profile_src, cover_src) values(?,?,?,?,?,?)`
//     db.run(sql,[username,email,mobilenumber,DOB,"",""],(err)=>{
//         if(err) {
//             console.error(err.message);
//             callback(0);
//         }
//     })
//     callback(1);
    
// }


    
    
//     //  console.log(rows.password)
//     //  console.log(rows.find(row => row.id === 1).password)
// //  db.close((err) => {
// //     if (err) {
// //       return console.error(err.message);
// //     }
// //   });