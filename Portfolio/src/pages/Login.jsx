import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../store/auth'
import {toast} from "react-toastify"
const Login = () => {
const[user,setUser]=useState({
  email:"",
  password:"",
})
const navigate=useNavigate()
const {storeTokenInLocalStr}=useAuth()


  const handleInput=(e)=>{
    console.log(e);
    
    let name=e.target.name 
    let value=e.target.value
    setUser({
      ...user,
      [name]:value,
    })

    
  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    console.log(user);
    try {
      const response=await fetch("http://localhost:3000/api/auth/login",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(user)
      })
      const res_data=await response.json()

      if(response.ok){
        console.log(response);
        console.log("Response From server is", res_data);
  
        storeTokenInLocalStr(res_data.token); // fun
  
        setUser({
          email:"",
          password:"",
      
        })
        navigate('/')
      } else{ 
        toast.error(res_data.extraDetails?res_data.extraDetails:res_data.message)

      }
     } catch (error) {
      console.log("Login",error);
      
     }
      
  }
  return (
    <section>
    <main>
      <div className="section-login">
        <div className="container grid grid-two-cols">
          <div className="login-image">
            <img src="/images/login.png" alt="Image" width="500" height="500"/>
          </div>

          {/* registration form */}
          <div className="login-form">
            <h1 className='main-heading'>Login Form</h1>
            <br />
            <form action="" onSubmit={handleSubmit}>

           
              <div>
                <label htmlFor="email">email</label>
                <input type="email" name='email' value={user.email} onChange={handleInput} placeholder='enter your email' id="email" required autoComplete='off' />
              </div>
          
              <div>
                <label htmlFor="password">password</label>
                <input type="password" name='password' value={user.password} onChange={handleInput} placeholder='enter password' id="password" required autoComplete='off' />
              </div>
            <br />
            <button type='submit' className='btn btn-submit'>Login Now</button>
            </form>
          </div>
        </div>
      </div>
    </main>
  </section>
  )
}

export default Login