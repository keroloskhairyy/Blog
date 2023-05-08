const express = require("express");
const User = require('../models/users')
const bodyParser = require('body-parser');
const path = require('path')
const route = express.Router();
route.use(express.static(path.join(__dirname,'../public/assets')));
route.use(bodyParser.urlencoded({ extended: true }));

route.get("/u",async function(req,res){
    let pathFile = path.join(__dirname,'../public/login.html')
    res.sendFile(pathFile)
})
route.post("/users/register", async function (req, res) {
    // res.send(req.body.userName)
    let users = await User.create({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    })
    let pathFile = path.join(__dirname,'../public/login.html')
    res.sendFile(pathFile)
  });
  module.exports = route;
