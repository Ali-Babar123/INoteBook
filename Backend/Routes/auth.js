const express = require('express');
const User = require('../models/User');
// we have Jason web token
const jwt = require('jsonwebtoken');
// we have a express validator 
const { body, validationResult } = require('express-validator');
// we have a router in express
const router = express.Router();
// for hash password
const bcrypt = require('bcryptjs')
// to fetch the user import
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = 'Muhammad ALi is a nice body'


// router.get('/', (req, res)=>{
  // creating a user using POST "/api/auth/createuser"
router.post('/createuser', [
  body('name', 'Enter a valid').isLength({ min: 3 }),
  body('email', 'Enter a valid Email').isEmail(),
  body('password').isLength({ min: 5 }),
], async (req, res) => {
  success = false;
  // console.log(req.body);
  // const user = User(req.body)
  // user.save();
  // if there are errors, return bad request and errors 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }
  // whether the email exists already
  // try{
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({success, error: "Sorry a user with this email already exists" });
  }
  // If there are no validation errors, it creates a new user record in the database using the User model's create method.
  const salt = await bcrypt.genSalt(10);

  const secPass = await bcrypt.hash(req.body.password, salt)
  user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: secPass
  })
  // res.json(user);
  
  const data = {
    user:{
        id: user.id
    }
  }
  const authtoken =  jwt.sign(data, JWT_SECRET);
  success = true;
  // console.log(jwtData);
  res.json({success, authtoken});

  // }).then(user => res.json(user));
  // } catch(error) {
  //    console.error(error.message);
  //    res.status(500).send("Some Error occured!");
  // }
 // Authenticate a user using : POST  "/api/auth/login"
  router.post('/login', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Cannot be Empty password').exists(),
  ], async (req, res) => {


    // array destructuring
     const {email, password} = req.body;

     try {
      let user = await User.findOne({email});
      success = false;
      if(!user){
        return res.status(400).json({success, error: "Please enter your correct Email!"});
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if(!passwordCompare){
        return res.status(400).json({success, error: "Please enter the correct Password"})
      }
      const data = {
        user:{
            id: user.id
        }
      }
      const authtoken =  jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success, authtoken});
     } catch (error) {
      console.error(error.message);
      res.status(500).json("Some error occured")
     }
    // if there are errors, return bad request and errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  })
   // Route 3 : get loggedin user details using post /api/auth/getuser.No login required
   router.post('/getuser',fetchuser, async (req, res) => {
   try {
    const userId = req.user.id; // to fetch userId
    const user = await User.findById(userId).select("-password");
    res.send(user);
   } 
   catch (error) {
    console.error(error.message);
    return res.status(500).json("Some error occured!")
   }
   })
});
module.exports = router