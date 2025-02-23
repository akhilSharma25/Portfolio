import React, { useEffect, useState } from 'react';
import { useAuth } from '../store/auth';

const About = () => {
const [activeUser,setActiveUser]=useState({
  username:""
})

  const {user,isLoggedIn}=useAuth()
  useEffect(() => {
    if (user) {
      setActiveUser({username:user.username});
    } else {
      console.log("Error: No user found");
    }
  }, [user]); // Dependency on 'user', so it runs whenever user changes

  return (
    <section className="about-section">
      <div className="container">
        <h1>About Us</h1>
        {
          isLoggedIn?<p>Hi {activeUser.username}</p>:  <p>
          Welcome to our website! We are committed to providing the best services and solutions to meet your needs. 
          Our team is passionate about delivering exceptional results and ensuring customer satisfaction.
        </p>
        }


        <div className="about-details">
          <h2>Our Mission</h2>
          <p>
            Our mission is to make a positive impact by delivering high-quality products and services that inspire and empower individuals and businesses to succeed.
          </p>

          <h2>Our Vision</h2>
          <p>
            To be a global leader in our field, driving innovation and excellence while maintaining our core values of integrity, commitment, and teamwork.
          </p>

          <h2>Why Choose Us?</h2>
          <ul>
            <li>Experienced and dedicated team</li>
            <li>Focus on quality and customer satisfaction</li>
            <li>Innovative solutions tailored to your needs</li>
          </ul>
        </div>

        {/* Call-to-action Button */}
        <div className="cta-button">
          <button 
            onClick={() => alert('Thank you for showing interest!')} 
            className="btn-learn-more"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
