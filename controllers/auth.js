const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
require("dotenv").config();
const sendEmail = require("../utils/sendEmail");
// register
const register = async(req,res) =>{
    try {
        const {name,username,email,password} = req.body;
        const findinguser = User.findOne({username:username});
        if(!findinguser === null){
          return  res.status(StatusCodes.CONFLICT).json({msg:"User already registered"})
        }
        console.log(req.body)
        if(!name ||!username || !email ||!password){
          return  res.status(StatusCodes.BAD_REQUEST).json({msg:"Bad request"})
        }
      const user = await User.create({...req.body})
      return res.status(StatusCodes.CREATED).json({data:user})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error.message})
        console.log(error.message)
    }
}
// login
const login = async(req,res)=>{
  try {
      const {email,password} = req.body;
      console.log(req.body)
      if(!email || !password){
         return res.status(StatusCodes.UNAUTHORIZED).json({msg:"Please provide all credentials"})
      }
      const user = await User.findOne({email})
      console.log(user)
      const hashPassword = user.password
      const checkingPassword = await bcrypt.compare(password,hashPassword)
      console.log(checkingPassword)
      if(!checkingPassword){
        return  res.status(StatusCodes.UNAUTHORIZED).json({msg:"You are providing wrong password."})
      }
     const token = jwt.sign({username:user.username,userID:user._id,role:user.role},process.env.MY_SECRET_KEY,{expiresIn:"10d"})
     console.log(user)
      res.status(StatusCodes.OK).json({token,username:user.username,userID:user._id,role:user.role})
  } catch (error) {
    console.log(error)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"Something gone wrong!"})  
  }
}
 /*const register = async (req, res) => {
   try {
     const { name, username, email, password } = req.body;
     console.log(req.body);
     if (!name || !username || !email || !password) {
       return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Bad request" });
     }
     const verificationToken = crypto.randomBytes(40).toString("hex");
     const user = await User.create({
       name,
       username,
       email,
       password,
       verificationToken,
     });
 await sendEmail();
     return res
       .status(StatusCodes.CREATED)
       .json({
         msg: "success please check your email",
       });
   } catch (error) {
     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
     console.log(error.message);
   }
 };*/

 // It was login after verification
/* const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    if (!email || !password) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Please provide all credentials" });
    }
    const user = await User.findOne({ email });
    console.log(user);
    const hashPassword = user.password;
    const checkingPassword = await bcrypt.compare(password, hashPassword);
    console.log(checkingPassword);
    if (!checkingPassword) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "You are providing wrong password." });
    }
    if (!user.isVerified) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Please verify you email" });
    }
    const token = jwt.sign(
      { username: user.username, userID: user._id, role: user.role },
      process.env.MY_SECRET_KEY,
      { expiresIn: "10d" }
    );
    console.log(user);
    res
      .status(StatusCodes.OK)
      .json({
        token,
        username: user.username,
        userID: user._id,
        role: user.role,
      });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal sever error!" });
  }
 };*/

// verify emailer

/* const verifyEmailer = async (req, res) => {
  try {
    const { verificationToken, email } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Please provide all credentials" });
    }
    if (user.verificationToken !== verificationToken) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Verification Failed" });
    }
    user.isVerified = true;
    user.verified = Date.now();
    user.verificationToken = "";
    await user.save();
    return res.status(StatusCodes.OK).json({ msg: "Email verified" });
  } catch (error) {
    return res.status(StatusCodes.OK).json({ msg: "Email verified" });
  }
 };*/

module.exports = { register, login };

/*   const {name,username,email,password} = req.body;
            console.log(req.body)
            if(!name ||!username || !email ||!password){
              return  res.status(StatusCodes.BAD_REQUEST).json({msg:"Bad request"})
            }
            const verificationToken = crypto.randomBytes(40).toString('hex');
          const user = await User.create({name,username,email,password,verificationToken})

          return res.status(StatusCodes.CREATED).json({msg:
          "success please check your email",token:verificationToken})
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error.message})
            console.log(error.message)
        }
}*/

