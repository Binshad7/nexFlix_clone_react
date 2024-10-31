// import React from 'react'
import { useState } from 'react'
import {Link} from 'react-router-dom'
function LoginPage() {
  const [email,SetEmail] = useState('')
  const [password,SetPassword] = useState('');
  let handleSignIn = (e)=>{
    e.preventDefault()
    
    
  }
  return (
    <div className="h-screen w-full hero-bg">
      <header className="max-w-6xl mx-auto items-center justify-between p-4">
             <Link to={'/'}> <img src="/images/netflix-logo.png" alt="logo"className="w-52" /></Link>
      </header>

       <div className="flex justify-center items-center mt-20 mx-3">
          <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md ">
                  <h1 className="text-center text-white text-2xl font-bold mb-4">Login </h1>
                  <form action="" className="space-y-4" onSubmit={handleSignIn}>
                    <div>
                      <label htmlFor="email" className="text-sm font-medium text-gray-300 block">
                        Email
                      </label>
                      <input type="email" autoComplete='binshad@gmail.com' className="
                      w-full px-3 py-2 mt-1 border-gray-700 rounded-md bg-transparent
                       text-white focus:outline-none focus:ring" 
                       placeholder="you@example.com"
                       id="email"
                       onChange={(e)=>SetEmail(e.target.value)}
                       value={email}
                       />
                    </div>

                 



                    <div>
                      <label htmlFor="password" className="text-sm font-medium text-gray-300 block">
                        Password
                      </label>
                      <input type="password"  autoComplete='123456' className="
                      w-full px-3 py-2 mt-1 border-gray-700 rounded-md bg-transparent
                       text-white focus:outline-none focus:ring" 
                       placeholder="**********"
                       id="Password"
                       onChange={(e)=>SetPassword(e.target.value)}
                       value={password}
                       />
                    </div>
                         
                         <button className="w-full py-2 bg-red-600 text-white 
                         font-semibold rounded-md hover:bg-red-700"
                         >
                          Sign Up
                         </button>
                  </form>

                  <div  className="text-center text-gray-400"> 
                  I don't have an Account?{''}
                    <Link to={'/signUp'} className="text-red-500 hover:underline">
                    Login
                    </Link>
                  </div>
          </div>
       </div>
    </div>
  )
}

export default LoginPage
