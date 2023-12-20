const jwt = require("jsonwebtoken");
const {StatusCodes} = require("http-status-codes")
require("dotenv").config();
const authMiddleware = async(req,res,next) =>{
     try {
        const auth = req.headers['authorization'];
        if(!auth || !auth.includes("Bearer ")){
            return res.status(StatusCodes.UNAUTHORIZED).json({msg:"You are UNAUTHORIZED "})
         }
         const token = auth.replace("Bearer ","")
         if(token===""){
            return res.status(StatusCodes.UNAUTHORIZED).json({msg:"You are UNAUTHORIZED "})
         }
         const decoded =  jwt.verify(token,process.env.MY_SECRET_KEY);
         req.user = decoded;
         console.log(decoded)
         next()
     } catch (error) {
        return  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error.message})
     }
}
const authPermission = (...roles) =>{
   // there is some gotcha here
   console.log(...roles)
   return (req,res,next)=>{
      console.log(req.user.role)
      if(!roles.includes(req.user.role)){
          throw new Error("UnAuthorization for this route")
      }
      next()
   }
}
module.exports = {authMiddleware,authPermission}