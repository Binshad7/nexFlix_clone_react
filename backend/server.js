// const express = require('express') // common JS
import express from 'express'
import morgan from 'morgan' ;

import authRoutes from './routes/auth.routes.js'
import movieRoutes from './routes/movie.routes.js'
import tvRoutes from './routes/tvshow.routes.js'

import {ENV_VARS} from './config/envVars.js'
import { connectDB } from './config/db.js'



const app = express()
const PORT = ENV_VARS.PORT

app.use(express.json());
app.use(morgan('dev'))
app.use(express.urlencoded({extends:true}))

// api  routes for login 
app.use('/api/v1/auth',authRoutes)
// for movie
app.use('/api/v1/movies',movieRoutes)
// tv shows
app.use('/api/v1/tv',tvRoutes)

app.listen(PORT,(()=>{
    try{

        connectDB() 
        console.log(`Server Running on ${PORT}`);
    }catch(error){
        console.log('server js app listen: ',error);
        
    }

}))



