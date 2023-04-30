// Learn about expressjs express-validation and jwtwebtoken and gensalt and bcrypt and jwtsign

const express = require('express');
const User = require('../models/User');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");
const fetchuser=require('../Moddleware/fetchuser');

// the secret key given by developer for security purpose
const JWT_Secret = "Welcometothe#$"

// ______________________________________________________________________________________

//Router 1 ENDPOINT : Create a user using post method "/api/auth/createuser" : No login required

router.post('/createuser',[
    // this is way to take the required things from the body
    body('name').isLength({min: 5}),
    body('email').isEmail(),
    body('password').isLength({min: 8}),
],async  (req , res)=>{
    let success=false
    // if there ar error , return the errors Error Check 
    const errors =validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success,errors: errors.array()});
    } 

    // Create a user
    // cheching whether the user with this email exits or not
    try {
    let user = await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).json({success,error: "Sorry user exits with same email id"})
    }

    // salt and bcrypt are the way to hide the actual password in the databse for the security pupose with hash method
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt) 

    
    user= await User.create({name: req.body.name,email: req.body.email,password: secPass,})
    // .then(user=>res.json(user));
    
    const data ={
        user:{
            id:user.id
        }
    }

    const authtoken=jwt.sign(data,JWT_Secret);
    console.log(jwtData);
    success=true
    res.json({success,authtoken})
    }catch (error) {
        console.error(error.message);    
        res.status(500).send("Some Error Occured");
    }
    console.log(req.body);// const user= User(req.body);// user.save();

})
// _________________________________________________________________________________________


// Router 2 ENDPOINT : Authenticate the User: /api/auth/login'

router.post('/login',[
    body('email', "Enter  a Valid Email").isEmail(),
    body('password', "Password cannot be Blank ").exists(),
],async(req,res)=>{
    let success = false
    // throw back error without disturbing the db and server
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success,errors: errors.array()});
    }
    // Used try Catch method
    // Destructing
    const{email,password}=req.body;

    try {
        let user = await User.findOne({email});
        if(!user){
            success=false
            return res.status(400).json({success,error:"User Doesn't Exists"})
        }
        // conparing password to login the user:
        const comparePassword = await bcrypt.compare(password,user.password);
        if(!comparePassword){
            success=false
            return res.status(400).json({success,error : "Wrong Credential"})
        }
        const data ={
            user:{
                id:user.id
            }
        }
        const authtoken=jwt.sign(data,JWT_Secret);
        success=true;
        res.json({success,authtoken})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Error Occured");
    }
});

//  _________________________________________________________________________________________


// Router 3  ENDPOINT : get user logged in Detail using POST method ::: Login required 

router.post('/getuser',fetchuser,async(req,res)=>{
try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error")
}
})

// __________________________________________________________________________________________________________________

module.exports = router