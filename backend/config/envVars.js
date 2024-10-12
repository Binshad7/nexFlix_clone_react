import dotenv from 'dotenv'

dotenv.config()



export const ENV_VARS = {
   MONGODB_URI:process.env.MONGODB_URi,
   PORT:process.env.PORT || 1111,
   JsToken:process.env.JWT_SECRET,
   NODE_ENV:process.env.NODE_ENV,
   TMDB_API:process.env.TMDB_API_KEY
}