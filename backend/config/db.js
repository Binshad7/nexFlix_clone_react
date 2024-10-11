import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectDB = async ()=>{
    try{
     const  connect =   await mongoose.connect(ENV_VARS.MONGODB_URI);
     console.log("MongoDB  connect: "+connect.connection.host);
     
    }catch(error){
        console.log(error,'error msg connect mongodb');
        process.exit(1)  // 1 means there was an error , 0 means success
    }
}