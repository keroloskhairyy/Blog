const express = require("express");
const User = require('../models/users')
const bodyParser = require('body-parser');
const path = require('path')
const route = express.Router();
route.use(express.static(path.join(__dirname,'../public/assets')));
route.use(bodyParser.urlencoded({ extended: true }));

route.post("/register", async function (req, res) {
    // res.send(req.body.userName)
    let users = await User.create({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    })
    let pathFile = path.join(__dirname,"..","public",'login.html')
    res.sendFile(pathFile)
  });

  route.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email ,password:req.body.password});
      if (!user) {
        res.status(401).json({ error: "Invalid credentials" });
      } else {
        console.log("keroTest");
      // req.session.loggedIn = true; //set the user as authenticated
      let pathFile = path.join(__dirname,"..","public",'home.html')
      res.sendFile(pathFile)  
  
      }
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  });
  // route.get("/home", async (req, res) => {
  //   let pathFile = path.join(__dirname,"..","public",'home.html')
  //       res.sendFile(pathFile)  
  // });














  module.exports = route;
