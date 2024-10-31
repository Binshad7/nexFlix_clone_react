// import React from 'react'
import { useState,useEffect } from "react"
import { Link,useNavigate } from "react-router-dom"
function SignUpPage() {
  const [username,setUserName] = useState('')
  const [email,setUserEmail] = useState('')
  const [password,setUserPassword] = useState('');
  const [error,setErrorMsg] = useState('');
  
  const navigate = useNavigate()
  useEffect(()=>{
        
  },[])
  let User = {
    username,
    email,
    password
  }
  const handleSignUp = (e)=>{
    e.preventDefault()
        console.log(username,email,password);
        fetch('http://localhost:1111/api/v1/auth/signup',{
          method:'post',
          headers:{
            'Content-Type':'application/json'
          },
           body:JSON.stringify(User)
        }).
        then(response=>response.json()).
        then((data)=>{
          if(data.success){
            navigate('/') 
          }else{
            setErrorMsg(data.message)
            setTimeout(()=>{setErrorMsg('')},5000)
          }
        }).catch((error)=>console.log(error.message))
  } 
  return (
    <div className="h-screen w-full hero-bg">
      <header className="max-w-6xl mx-auto items-center justify-between p-4">
             <Link to={'/'}> <img src="/images/netflix-logo.png" alt="logo"className="w-52" /></Link>
      </header>

       <div className="flex justify-center items-center mt-20 mx-3">
          <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md ">
                  <h1 className="text-center text-white text-3xl font-bold mb-4">Sign Up </h1>
                  <form action="" className="space-y-4" onSubmit={handleSignUp}>
                    <div>
                      <h2 className="text-red-700 font-serif font-xl text-center">{error}</h2>
                      <label htmlFor="email" className="text-sm font-medium text-gray-300 block">
                        Email
                      </label>
                      <input type="email" autoComplete=""  className="
                      w-full px-3 py-2 mt-1 border-gray-700 rounded-md bg-transparent
                       text-white focus:outline-none focus:ring" 
                       placeholder="you@example.com"
                       id="email"
                       onChange={(e)=>setUserEmail(e.target.value)}
                       value={email}
                       />
                    </div>

                    <div>
                      <label htmlFor="Username" autoComplete="binshad" className="text-sm font-medium text-gray-300 block">
                        Username
                      </label>
                      <input type="text"  autoComplete='' className="
                      w-full px-3 py-2 mt-1 border-gray-700 rounded-md bg-transparent
                       text-white focus:outline-none focus:ring" 
                       placeholder="Enter your name"
                       id="Username"
                       onChange={(e)=>setUserName(e.target.value)}
                       value={username}
                       />
                    </div>



                    <div>
                      <label htmlFor="password" className="text-sm font-medium text-gray-300 block">
                        Password
                      </label>
                      <input type="password" autoComplete="hy"  className="
                      w-full px-3 py-2 mt-1 border-gray-700 rounded-md bg-transparent
                       text-white focus:outline-none focus:ring" 
                       placeholder="**********"
                       id="Password"
                       onChange={(e)=>setUserPassword(e.target.value)}
                       value={password}
                       />
                    </div>
                         
                         <button className="w-full py-2 bg-red-600 text-white 
                         font-semibold rounded-md hover:bg-red-700"
                         >
                          Sign Up
                         </button>
                  </form>

                  <div className="text-center text-gray-400"> 
                    Already a member?{''}
                    <Link to={'/login'} className="text-red-500 hover:underline">
                    Sign In
                    </Link>
                  </div>
          </div>
       </div>
    </div>
  )
}

export default SignUpPage
