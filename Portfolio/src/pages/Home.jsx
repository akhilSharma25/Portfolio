import React from 'react'
import Footer from './Footer'

const Home = () => {
  return (
    <>
    <main>
      <section className='section-hero'>
        <div className="container grid grid-two-cols">
          <div className="hero-content">
              
              <p>      A Passionate Full-Stack Developer 🚀 & Future DevOps Engineer 🌟
              </p>
              <h1> Hi, I'm Akhil Sharma
              </h1>
              <p>
              With expertise in the MERN stack and proficiency in modern frontend and backend technologies, 
              I'm also gearing up to explore the exciting world of DevOps to bridge the gap between development and operations.
              
              Let’s collaborate to turn creative ideas into robust, scalable solutions. 
              Your next big project deserves the best, and I’m here to help you make it happen.
              </p>

              <div className="btn btn-group">
                <a href="/contact">
                <button className='btn'>connect now</button></a>
                <a href="/service">
                <button className='btn secondary-btn'>Learn More</button></a>
              </div>
          </div>


          {/* hero image */}

          <div className="hero-image">
            <img src="/images/home.png" alt="image" width="400" height="500" />
          </div>
        </div>

      </section>
    </main>

    {/* 2nd section> */}
    <section className='section-analytics'>
  <div className="container grid grid-four-cols">
    <div className="div1">
      <h2>15+</h2>
      <p>Personal Projects</p>
    </div>
    <div className="div1">
      <h2>7+</h2>
      <p>Technologies Mastered</p>
    </div>
    <div className="div1">
      <h2>200+</h2>
      <p>DSA Problem Solved</p>
    </div>
    <div className="div1">
      <h2>2+</h2>
      <p>Open-Source Contribution</p>
    </div>
  </div>
</section>
 
 {/* 3rd section  */}
 <section className='section-hero'>
        <div className="container grid grid-two-cols">
        <div className="hero-image">
            <img src="/images/home.png" alt="image" width="400" height="500" />
          </div>
          <div className="hero-content">
              
          <p>Transforming Ideas into Reality with Full-Stack Development 🚀 & DevOps Expertise 🌟</p>
  <h1>Get Started Today</h1>
  <p>
    Ready to bring your project to life? Whether you need a full-fledged web application or a seamless DevOps pipeline, 
    I am here to make it happen. Let’s collaborate to create efficient, scalable, and innovative solutions that deliver results.
  </p>

              <div className="btn btn-group">
                <a href="/contact">
                <button className='btn'>connect now</button></a>
                <a href="/service">
                <button className='btn secondary-btn'>Learn More</button></a>
              </div>
          </div>


   
        </div>

      </section>
    


    </>
  )
}

export default Home