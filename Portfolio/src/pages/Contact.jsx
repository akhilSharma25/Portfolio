import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/auth';
import {toast} from "react-toastify"

const Contact = () => {
  const [contact,setContact]=useState({
    username:"",
    email:"",
    message:""
  })

  const [userData,setUserData]=useState(true)

  const {user}=useAuth()
 // Using useEffect to update contact form when user data changes
 useEffect(() => {
  if (user && userData) {
    setContact({
      username: user.username,
      email: user.email,
      message: ""
    });
    setUserData(false); // Set user data to true to prevent re-setting
  }
}, [user]); // Dependency on user and userData

  const handleInput = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    console.log('Form Data:', contact);
    toast('Form submitted successfully!');
    // setContact({ username: '', email: '', message: '' }); // Clear the form

    try {
    const response=  await fetch("http://localhost:3000/api/form/contact",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(contact)
      })

      if(response.ok){
        setContact({
          username:"",
          email:"",
          message:""
        })

        toast("Message Send Successfully")
      }
    } catch (error) {
      
    }
  };
  return (

    <section className='section-contact'>
      <div className=" contact-content container">
      <h1  className='main-heading'>Contact Us</h1>
      <div className="container grid grid-two-cols">
        <div className="contact-img">
            <img src="/images/support.png" alt="image" width="400" height="500" />
          </div>
        
          <section className="section-form">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                value={contact.username}
                onChange={handleInput}
                autoComplete="off"
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={contact.email}
                onChange={handleInput}
                autoComplete="off"
                required
              />
            </div>
            <div>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                cols="50"
                required
                value={contact.message}
                onChange={handleInput}
              ></textarea>
            </div>
            <button type="submit" className='btn btn-submit'>Submit</button>
          </form>
        </section>
      </div>
      </div>

      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109744.05905783064!2d76.68831085598289!3d30.73240198453836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fed0be66ec96b%3A0xa5ff67f9527319fe!2sChandigarh!5e0!3m2!1sen!2sin!4v1738083460042!5m2!1sen!2sin" width="100%" height="450"  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

 

      

   
        
    </section>
  )
}

export default Contact