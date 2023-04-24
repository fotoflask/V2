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

// const cursor = collection("tables").find({}); // Assign the cursor object returned by find

//   // Call toArray on the cursor object
//   cursor.toArray((err, docs) => {
//     if (err) {
//       console.error('Failed to retrieve documents from collection:', err);
//       return;
//     }

//     console.log('Retrieved documents:', docs);
//     // Do further processing with the retrieved documents

//     // Close the MongoDB client
//     client.close();
//   });
let doc4

// con.collection('UserDetails').findOne({duserId : 1}).then(result=>{
//   doc4 = result
//   console.log(doc4.dprofilepic)})

let userid_delete = 0;



con.collection("tables").findOne({duserId : 1}).then(result=>{
  doc4 = result
  console.log(doc4)})

 

