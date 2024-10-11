import  mongoose  from "mongoose";

 const userSchema = new mongoose.Schema({
   username:{
    type:String,
    required:true,
    unique:true
   },
   email:{
    type:String,
    required:true,
    unique:true
   },
   password:{
    type:String,
    required:true,
   },
   image:{
    type:String,
    default:''
   },
   searchHistory:{
    type:Array,
    default:[]
   }
})

export const userModel = mongoose.model('Users',userSchema)