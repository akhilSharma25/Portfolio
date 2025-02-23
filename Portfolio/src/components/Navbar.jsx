import React from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../store/auth'
const Navbar = () => {
  const {isLoggedIn}=useAuth()
  return (

    <header>
       <div className="container">
        <div className="logo_brand">
            <NavLink to="/">Akhil Sharma</NavLink>
        </div>

        <nav>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/service">Services</NavLink></li>

                <li><NavLink to="/contact">Contact</NavLink></li>
      
                {!isLoggedIn?<><li><NavLink to="/register">Register</NavLink></li>
                  <li><NavLink to="/login">Login</NavLink></li></>
                                :        <li>

                <NavLink to="/logout">LogOut</NavLink>
              </li>
                }
            </ul>
        </nav>
       </div>

    </header>
  )
}

export default Navbar