require('dotenv').config()
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sessionuser = require('../middleware/sessionuser');

const JWT_SECRECT = process.env.JWT_SECRECT;

// Route:1 create a user using API : POST "/api/auth/createuser"  POST do not require auth
router.post(
  "/createuser",
  [
    body("name", "Enter a Valid Name").isLength({ min: 3 }),
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Enter a Valid Password Min Length 5").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // validation check errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // check the user email exits already or not
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ errors: "You have already an account with this email" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt); 
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data ={
          user:{
            id:user.id
          }
      }
      // .then(user => res.json(user));
      const token = jwt.sign(data, JWT_SECRECT);
      res.json({token});
    } catch (error) {
      console.error(error.message);
      res
        .status(400)
        .send("some error found");
    }
  }
);

//Route:2 authinticate a user using API POST : "/api/auth/login" no login required no session required
router.post(
  "/login",
  [
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Password cannot be empty").exists()
  ],
  async (req, res) => {
   // check errors
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }
   const {email,password} = req.body;
    try {
      let user = await User.findOne({email})
      if(!user){
        return res.status(400).json({ error: "Invalid Credenatials" });
      }
      const passwordCompare = await bcrypt.compare(password,user.password);
      if(!passwordCompare){
        return res.status(400).json({ error: "Invalid Credenatials" });
      }
      const data ={
        user:{
          id:user.id
        }
    }
    // .then(user => res.json(user));
    const token = jwt.sign(data, JWT_SECRECT);
    res.json({token});
    } catch (error) {
      console.error(error.message);
      res
        .status(400)
        .send("Intertal Server Error");
    }
    }
  );

//Route:3 Get logined user details API using POST : "/api/auth/getuser" login required
router.post("/getuser",sessionuser,async (req, res) => {
   try {
     userId = req.user.id;
     const user = await User.findById(userId).select("-password");
     res.send(user);
   } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .send("Intertal Server Error");
  }
  }
  );
module.exports = router;
