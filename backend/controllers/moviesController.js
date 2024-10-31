import { fetchFromTMDB } from "../services/tmdb.service.js"

export const getTrendingMovies = async (req,res)=>{
    try{
        const data = await fetchFromTMDB( 'https://api.themoviedb.org/3/trending/all/day?language=en-US')
        const randomMovie  = data.results[Math.floor(Math.random()*data.results?.length)];
        res.json({success:true,content:randomMovie})
    }catch(error){
        console.log('moviesController get movie trending error',error.message);
            res.status(500).json({success:false,message:"Internal server Error"})
    }
}

export const getMovieTrailers = async (req,res)=>{
    const id = req.params.id;   
    
    try{
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`)
        
        
      return  res.status(200).json({status:true,message:data.results})
    }catch(error){
        if(error.message.includes("404")){
           return res.status(404).send(null)
        }
        console.log('moviesController get movie trailers error',error.message);
        res.status(500).json({success:false,message:"Internal server Error"})
    }
}

export const getMovieDetails =async (req,res)=>{
    const id = req.params.id
     console.log(id);
     
    try{
     const data = await  fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`) ;
     res.status(200).json({status:true,content:data});
    }catch(error){
        console.log('moviesController get movie details error',error.message);
        res.status(500).json({success:false,message:"Internal server Error"})
    }
}
export const getSimilarMovie = async (req,res)=>{
    
    const id = req.params.id;
    try{
          const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`)
          res.status(200).json({status:true,content:data.results})
    }catch(error){
        console.log('moviesController get similar movies error',error.message);
        res.status(500).json({success:false,message:"Internal server Error"})
    }
}

export const getMovieByCategory =async (req,res)=>{
    const category = req.params.category;
    try{
      const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`)
      res.status(200).json({status:true,content:data})
    }catch(error){
        console.log('moviesController get category movies error',error.message);
        res.status(500).json({success:false,message:"Internal server Error"})
    }
}