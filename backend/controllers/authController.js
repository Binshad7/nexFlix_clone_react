import {userModel} from '../models/userModels.js'
import bcryptjs from 'bcryptjs'
import { generateTokenAndSetCookie } from '../utils/generateToken.js';

export const signup = async  (req,res)=>{
   try{
    console.log(req.body)
     const {email,password,username} = req.body;
     if(!email || !password || !username ){
        return res.status(400).json({success:false,message:'All fields are required '})
     }

     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
     if(!emailRegex.test(email)){
        return res.status(400).json({success:false,message:'Invalid email'})
     }

     if(password.length < 6 ){
        return res.status(400).json({success:false,message:'Password must be at least 6 characters '})
     }

     const existingUserByEmail = await userModel.findOne({email});
     if(existingUserByEmail){
        return res.status(400).json({success:false,message:'Email already exists'})
     }

     const existingUserByName = await userModel.findOne({username});
     if(existingUserByName){
         return res.status(400).json({success:false,message:'UserName already exists'})
        }
       const hasPassword = await bcryptjs.hash(password,12)
        const PROFILE_PICS = ['/UserProfile/avatar1.png','/UserProfile/avatar2.png','/UserProfile/avatar3.png']
       const image = PROFILE_PICS[Math.floor(Math.random()*PROFILE_PICS.length)]
        const NewUser = await new userModel({
            email,
            username,
            password:hasPassword,
            image
        })
        const newUserAdded = await NewUser.save()

        
            generateTokenAndSetCookie(newUserAdded._id,res)
            // remove password form the response
            res.status(200).json({success:true,message:'Signup Success fully completed',user:{
                ...NewUser._doc,
                password:''
            }})
        
    }catch(error){
        console.log('signup controller ',error.message);
       res.status(500).json({success:false,message:'Internal server error'})
   }
}


export const login = async  (req,res)=>{
    try{
         const {email,password} = req.body;
      if(!email || !password){
        return res.status(400).json({success:false,message:'All fields are required '})
      }
      const user = await userModel.findOne({email});
      if(!user){
        return res.status(404).json({success:false,message:'Invalid email or password'})
      }
     const isPasswordCorrect = await bcryptjs.compare(password,user.password)
     if(!isPasswordCorrect){
        return res.status(400).json({status:false,message:'Invalid Password'})
     }
     generateTokenAndSetCookie(user._id,res);
     res.status(200).json({
        success:true,
        user:{
            ...user._doc,
            password:''
        }
     })
    }catch(error){
        console.log("authController login Error",error.message);
           res.status(500).json({success:false,message:'Internal server error'})
    }
}


export const logout = async  (req,res)=>{
   try{ 
      res.clearCookie('jwt-netflix')
      res.status(200).json({success:true,message:'Logged out successfully'})
   }catch(error){
       console.log('authController logout error',error.message);
       res.status(500).json({success:false,message:'Internal server error'})
   }
}     

 