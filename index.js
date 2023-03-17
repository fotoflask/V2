const express = require("express")
const bodyparser = require("body-parser")

const app = express()
const PORT = 3000
app.set('view engine', 'ejs');

//For static things to be used
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));

app.listen(PORT, () => {
    console.log(`Server Running at ${PORT}`)
})

const email = "poojyanth@gmail.com"
const pwd = "poojyanth"


const profilepic = ["/images/IMG_20221113_222958_639.png","/images/IMG_20221113_222958_639.png","/images/IMG_20221113_222958_639.png","/images/IMG_20221113_222958_639.png","/images/IMG_20221113_222958_639.png","/images/IMG_20221113_222958_639.png",]
const postnumber = [6]
const imagesrc= ["/images/anther.png","/images/basketball_court-2.png","/images/IMG20221231094849-1@0.5x.png","/images/orangeflower.png","/images/spider-1.jpg","/images/pinkflower_new-1-signed.png"]
const post_username = ["Poojyanth Reddy","Poojyanth Reddy","Poojyanth Reddy","Poojyanth Reddy","Poojyanth Reddy","Poojyanth Reddy"]
const likes = [300,250,230,500,100,532]


//Basic Send request and response, send html element 
// app.get("/", (req,res)=>{
//     res.status(200).send("<h2>What the fuck</h2>")
// })


//Send a ejs file (static) as response
app.get("/signin-signup", (req,res)=>{
    res.status(200).render("signin-signup")
})

app.get("/homepage", (req,res)=>{
    res.status(200).render("homepage",{profilepic: profilepic,likes: likes, imagesrc : imagesrc, post_username: post_username,postnumber: postnumber})
})

app.post("/signin-signup", (req,res)=>{
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

//Add specific path for the url
app.get("/contact", (req,res)=>{
    res.status(200).render("contact",{pagetitle:"Contact"})
})

