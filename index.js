const express = require("express")
const bodyparser = require("body-parser")

const app = express()
const PORT = 3000
app.set('view engine', 'ejs');

//For static things to be used
app.use(express.static("public"));
app.use(express.static("private"));
app.use(bodyparser.urlencoded({extended: true}));

app.listen(PORT, () => {
    console.log(`Server Running at ${PORT}`)
})

const email = "poojyanth@gmail.com"
const pwd = "poojyanth"


const profilepic = ["/images/IMG_20221113_222958_639.png","/images/IMG_20221113_222958_639.png","/images/IMG_20221113_222958_639.png","/images/IMG_20221113_222958_639.png","/images/IMG_20221113_222958_639.png","/images/IMG_20221113_222958_639.png",]
const coverphoto = ["/images/basketball_court-2.png","/images/basketball_court-2.png","/images/basketball_court-2.png","/images/basketball_court-2.png","/images/basketball_court-2.png","/images/basketball_court-2.png"]
const postnumber = [6]
const imagesrc= ["/images/anther.png","/images/basketball_court-2.png","/images/IMG20221231094849-1@0.5x.png","/images/orangeflower.png","/images/spider-1.jpg","/images/pinkflower_new-1-signed.png"]
const post_username = ["Poojyanth Reddy","Poojvth Reddy","Poojvth Reddy","Poojyanth Reddy","Poojyanth Reddy","Poojyanth Reddy"]
const user_id = ["poojyanth_reddy","poojyanth_reddy","poojyanth_reddy","poojyanth_reddy","poojyanth_reddy","poojyanth_reddy","poojyanth_reddy",]
const likes = [300,250,230,500,100,532]
const comments = [30,20,23,50,10,53]


//Basic Send request and response, send html element 
// app.get("/", (req,res)=>{
//     res.status(200).send("<h2>What the fuck</h2>")
// })


//Send a ejs file (static) as response
app.get("/signin-signup", (req,res)=>{
    res.status(200).render("signin-signup")
})

app.get("/", (req,res)=>{
    res.status(200).render("signin-signup")
})

app.get("/homepage", (req,res)=>{
    res.status(200).render("homepage",{profilepic: profilepic,likes: likes, imagesrc : imagesrc, post_username: post_username,postnumber: postnumber})
})

// app.post("/signin-signup", (req,res)=>{
//     if(req.body.Email == email){
//         if(req.body.password == pwd){
//             res.redirect('/homepage')
//         } 
//         else{
//             console.log('pwd not correct')
//             res.redirect('/signin-signup')
//         }
//     }
//     else{
//         console.log('email not correct')
//         console.log(req.body.Email)
//     }
    
// })

app.post("/signin-signup/signin", (req,res)=>{
    if(req.body.Email == email){
        if(req.body.password == pwd){
            res.redirect('/homepage')
        } 
        else{
            console.log('pwd not correct')
            res.redirect('/signin-signup')
        }
    }
    else{
        console.log('email not correct')
        console.log(req.body.Email)
    }
    
})

app.post("/signin-signup/signup", (req,res)=>{
    if(req.body.Email == email){
        if(req.body.password == pwd){
            res.redirect('/homepage')
        } 
        else{
            console.log('pwd not correct')
            res.redirect('/signin-signup')
        }
    }
    else{
        console.log('email not correct')
        console.log(req.body.Email)
    }
    
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
    for(let i = 0; i < post_username.length; i++){
        if(post_username[i] == post_username_received)
        {postnumber_res = postnumber_res + 1
        profilepic_res = profilepic[i]
        coverphoto_res = coverphoto[i]
        user_id_res = user_id[i]
        imagesrc_res.push(imagesrc[i])
        like_res.push(likes[i]) }
    }
    res.render("profilepage",{profilepic: profilepic_res,coverphoto: coverphoto_res,likes: like_res, user_id: user_id_res, imagesrc: imagesrc_res, postnumber: postnumber_res,comments:comments, user_name:post_username_received})
 })

//Add specific path for the url
app.post("/profilepage", (req, res) => {
    console.log("H")
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