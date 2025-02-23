import React from 'react'
import { useAuth } from '../store/auth'
import "./Service.css"
const Service = () => {

const {services}=useAuth()
  
    // Check if services is an array
    if (!Array.isArray(services)) {
      return <div>Loading or error in fetching services...</div>;
    }
  return (
    <section className='section-services'>
      <div className="container">
        <h1 className='main-heading'>Services</h1>
      </div>

      <div className="container grid grid-three-cols">
    {
      services.map((currElem,index)=>{
        const {serviceid,serviceName,price,description}=currElem;
       
        return (
          <div className="card" key={index}>
          <div className="card-img">
            <img src="/images/design.png" alt="image" width="500"  height="500"/>
          </div>
          <div className="card-details">
            <div className="grid grid-two-cols">
              <p>{serviceid}</p>
              <p>{serviceName}</p>
            </div>
            <h2>{price}</h2>
            <p>{description}</p>
          </div>
        </div>
        )
      })
    }
      </div>
    </section>
  )
}

export default Service