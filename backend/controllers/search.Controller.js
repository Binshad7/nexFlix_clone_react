import { userModel } from "../models/userModels.js";
import { fetchFromTMDB } from "../services/tmdb.service.js";

export const  searchPerson = async(req,res)=>{
    
    const params = req.params.query
    console.log(params);
  
    try{
      const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${params}&include_adult=false&language=en-US&page=1`);
      if(response?.results?.length==0){
       return res.status(404).json({status:false,message:"Data Not Found with you'r input"})
      }
      
      // for search history
    
    await userModel.findOneAndUpdate({_id:req.user._id},{
        $push:{
          searchHistory:{
                id:response.results[0].id,
                image:response.results[0].profile_path,
                title:response.results[0].name,
                searchType:'person',
                createdAt:new Date()
              }
            }
          })
         
      res.status(200).json({status:true,message:response.results})
    }catch(error){
        console.log('search person error',error.message);
        res.status(500).json({success:false,message:"Internal server Error"});
    }

}
export const  searchMovie = async(req,res)=>{
//   'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1'
const params = req.params.query
try{
       const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${params}&include_adult=false&language=en-US&page=1`)
       if(response?.results?.length==0){
       return res.status(404).json({status:false,message:"Data Not Found with you'r input"})
       }
      
      
       // search history
      let after =await userModel.findOneAndUpdate({_id:req.user._id},{
        $push:{
          searchHistory:{
                id:response.results[0].id,
                image:response.results[0].poster_path,
                title:response.results[0].title,
                searchType:'Movie',
                createdAt:new Date()
            }
        }
      })
     
      console.log(after);
      
       res.status(200).json({status:true,message:response.results})
}catch(error){
    console.log('search movie  error',error.message);
    res.status(500).json({success:false,message:"Internal server Error"});
}
}


// 
export const  searchTv = async(req,res)=>{

  const params = req.params.query;
  try{
      const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${params}&include_adult=false&language=en-US&page=1`)
      if(response?.results?.length==0)  return res.status(404).json({status:false,message:"Data Not Found with you'r input"})
      
      
      // search history
       await userModel.findOneAndUpdate({_id:req.user._id},{
        $push:{
          searchHistory:{
                id:response.results[0].id,
                image:response.results[0].poster_path,
                title:response.results[0].name,
                searchType:'Tv',
                createdAt:new Date()
            }
        }
      })
        res.status(200).json({status:true,message:response.results})
  }catch(error){
    console.log('search tv  error',error.message);
    res.status(500).json({success:false,message:"Internal server Error"});
  }
}


export const getSearchHistory = async (req,res)=>{
    try{
     

      const response  =await userModel.aggregate([
        {$match:{_id:req.user._id}},
        {$unwind:"$searchHistory"},
        {$project:{_id:0,searchHistory:1,username:1}}
      ]); 
      if(response.length === 0){
        return res.status(200).json({status:true,message:"Search is Empty"})
      }
       res.status(200).json({status:true,message:response})
    }catch(error){
        console.log('search history  error',error.message);
        res.status(500).json({success:false,message:"Internal server Error"});
    }
}
export const removeFomSearchHistory = async (req,res)=>{
    let  id = req.params.id
    id = parseInt(id)

    
    try{
         const response = await userModel.findOneAndUpdate({_id:req.user._id},
          {
            $pull:{
              searchHistory:{
                id:id
              }
            }
          }
        );
        console.log(response);
        
         if(response){
          return  res.status(200).json({status:true,message:'Success fully removed from search history'});
         }  
         res.status(304).json({status:false,message:'Not deleted'});
    }catch(error){
        console.log('search deleteHistory  error',error.message);
        res.status(500).json({success:false,message:"Internal server Error"});
    }
}

  export const clearHistory = async (req,res)=>{
    try{
      const clearSearchHistory = await userModel.updateOne(
        {_id:req.user._id},
        {
         $set:{
          searchHistory:[]
         }
      })
      console.log(clearSearchHistory);
      if(!clearSearchHistory){
        return res.status(401).json({status:true,menubar:'Data Not Deleted'})
      }
      res.status(200).json({status:true,message:'Search history is clear Now'})
  }catch(error){
    console.log('search movie clearHistory', error.message);;
    res.status(500).json({status:false,message:'Server is Down Please try again letter'})
  }
 }