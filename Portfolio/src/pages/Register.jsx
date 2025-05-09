import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"
import { useAuth } from '../store/auth';
import {toast} from "react-toastify"

const Register = () => {

  const [user,setUser]=useState({
    username:"",
    email:"",
    phone:"",
    password:"",

  });

  

  const navigate=useNavigate()
  const {storeTokenInLocalStr}=useAuth()

  const handleInput=(e)=>{
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
    const response=await fetch("https://portfolio-pdrk.onrender.com/api/auth/register",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify(user)
    })

    const res_data=await response.json()

    if(response.ok){
      console.log("Response From server is", res_data);

      storeTokenInLocalStr(res_data.token); // fun
      
      console.log("Data",response);

      setUser({
        username:"",
        email:"",
        phone:"",
        password:"",
    
      })
      navigate('/login')
    } else{ 
         toast.error(res_data.extraDetails?res_data.extraDetails:res_data.message)
    }
   } catch (error) {
    console.log("register",error);
    
   }
    

  }
  return (

    <section>
      <main>
        <div className="section-registration">
          <div className="container grid grid-two-cols">
            <div className="registration-image">
              <img src="../public/images/register.png" alt="Image" width="500" height="500"/>
            </div>

            {/* registration form */}
            <div className="registration-form">
              <h1 className='main-heading'>Registration Form</h1>
              <br />
              <form action="" onSubmit={handleSubmit}>

                <div>
                  <label htmlFor="username">username</label>
                  <input type="text" name='username' value={user.username} onChange={handleInput} placeholder='enter username' id="username" required autoComplete='off' />
                </div>
                <div>
                  <label htmlFor="email">email</label>
                  <input type="email" name='email'value={user.email} onChange={handleInput} placeholder='enter your email' id="email" required autoComplete='off' />
                </div>
                <div>
                  <label htmlFor="phone">phone</label>
                  <input type="number" name='phone' value={user.phone} onChange={handleInput} placeholder='enter your phone number' id="phone" required autoComplete='off' />
                </div>
                <div>
                  <label htmlFor="password">password</label>
                  <input type="password" name='password' value={user.password} onChange={handleInput} placeholder='enter password' id="password" required autoComplete='off' />
                </div>
              <br />
              <button type='submit' className='btn btn-submit'>Register Now</button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </section>
  )
}

export default Register