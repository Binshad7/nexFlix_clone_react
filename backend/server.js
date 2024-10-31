// const express = require('express') // common JS
import express from 'express'
import morgan from 'morgan' ;
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js'
import movieRoutes from './routes/movie.routes.js'
import tvRoutes from './routes/tvshow.routes.js'
import searchRoutes from './routes/search.routes.js'
import { protectRoute } from './middleware/protectRouter.js';
import {ENV_VARS} from './config/envVars.js'
import { connectDB } from './config/db.js'
import cors from'cors'

const app = express()
const PORT = ENV_VARS.PORT

app.use(cookieParser())
app.use(express.json());
app.use(morgan('dev'))
// app.use(express.urlencoded({extends:true}))

// cors setting 
const corsOptions = {
    origin:'http://localhost:5173',
    optionsSuccessStatus:200
}
app.use(cors(corsOptions))
// api  routes for login 
app.use('/api/v1/auth',authRoutes)
// for movie
app.use('/api/v1/movies',protectRoute,movieRoutes)
// tv shows
app.use('/api/v1/tv',protectRoute,tvRoutes)
// search route
app.use('/api/v1/search',protectRoute,searchRoutes)

app.listen(PORT,(()=>{
    try{

        connectDB() 
        console.log(`Server Running on ${PORT}`);
    }catch(error){
        console.log('server js app listen: ',error);
        
    }

}))



