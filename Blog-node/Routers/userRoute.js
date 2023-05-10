const express = require("express");
const User = require('../models/users')
const bodyParser = require('body-parser');
const path = require('path')
const route = express.Router();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

route.use(cookieParser());
route.use(express.static(path.join(__dirname,'../public/assets')));
route.use(bodyParser.urlencoded({ extended: true }));


route.post("/register", async function (req, res) {
    
    // const passToken = jwt.sign({ pass:req.body.password }, 'shhhhh')
    // const emailToken = jwt.sign({ email:req.body.email }, 'shhhhh')
    let users = await User.create({
      userName: req.body.userName,
      email: req.body.email ,
      password: req.body.password,
    })
    let pathFile = path.join(__dirname,"..","public",'login.html')
    res.sendFile(pathFile)
  });
route.get('/login',async (req,res)=>{
  let pathFile = path.join(__dirname,"..","public",'login.html')
    res.sendFile(pathFile)
})
  route.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email ,password:req.body.password});
      if (!user) {
        res.status(401).json({ error: "Invalid credentials" });
      } else {
        // Jeson Encryption Id 
        const token = jwt.sign({ iti: user.id }, 'shhhhh');
        // Set The Id In Cookie With Encryption
        res.cookie('userId', token, { maxAge: 900000, httpOnly: true });
    
      res.redirect('/user/home')
      }
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  });
  route.get("/home", async (req, res) => {
    let pathFile = path.join(__dirname,"..","public",'home.html')
    res.sendFile(pathFile) 
    // Get The Id From Cookie 
    const userId = req.cookies.userId;
    console.log(userId+"   Id In Home");

  });
  
  route.get("/userblog", async (req, res) => {
    let pathFile = path.join(__dirname,"..","public",'userblog.html')
    res.sendFile(pathFile) 
    // Get The Id From Cookie 
    const userId = req.cookies.userId;

    console.log(userId+"   Id In User Blog");
  });
  route.get("/profile", async (req, res) => {
    let pathFile = path.join(__dirname,"..","public",'profile.html')
    res.sendFile(pathFile) 
    // Get The Id From Cookie 
    const userId = req.cookies.userId;

    console.log(userId+"   Id In User Profile");
  });
  














  module.exports = route;
