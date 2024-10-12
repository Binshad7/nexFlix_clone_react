import jwt from "jsonwebtoken";
import { userModel } from "../models/userModels.js";
import { ENV_VARS } from "../config/envVars.js";

export const protectRoute =async (req,res,next)=>{
 try{
     console.log(req.cookies);
    const token = req.cookies['Jwt-netflix'];
    
    if(!token){
        return res.status(401).json({success:false,message:'Unauthorized - No token Provided'})
    }
    const decoded = jwt.verify(token,ENV_VARS.JsToken)
    if(!decoded){
        return res.status(401).json({success:false,message:'Unauthorized - No token Provided'})
    }
    const user = await userModel.findById(decoded.userId).select("-password")
    if(!user){
        return res.status(401).json({success:false,message:'Unauthorized - No token Provided'})
    }
    req.user = user
    next()
 }catch(error){
    console.log('middleware  error',error.message);
    res.status(500).json({success:false,message:"Internal server Error"});
 }
}