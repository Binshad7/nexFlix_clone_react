// const express = require('express') // common JS
import express from 'express'
import authRoutes from './routes/auth.js'
import {ENV_VARS} from './config/envVars.js'
import { connectDB } from './config/db.js'
import morgan from 'morgan' ;

const app = express()
const PORT = ENV_VARS.PORT

app.use(express.json());
app.use(morgan('dev'))
app.use(express.urlencoded({extends:true}))

// api  routes

app.use('/api/v1/auth',authRoutes)

app.listen(PORT,(()=>{
    try{

        connectDB() 
        console.log(`Server Running on ${PORT}`);
    }catch(error){
        console.log('server js app listen: ',error);
        
    }

}))