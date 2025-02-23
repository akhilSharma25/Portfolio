import React from 'react'
import '../Navbar.css'
import { Navigate, NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../../store/auth'
const Admin = () => {
  const {user,isLoading}=useAuth()
  console.log("Admin layout ",user);

  if(isLoading){
    return <h1>Loading.....</h1>
  }
  if(!user.isAdmin){
    return <Navigate to="/"/>
  }
  
  return (




 <>
    <header>
       <div className="container">
     

        <nav>
            <ul>
                <li><NavLink to="/admin/users">Users</NavLink></li>


                <li><NavLink to="/admin/contacts">Contacts</NavLink></li>
                <li><NavLink to="/service">Services</NavLink></li>
                <li><NavLink to="/">Home</NavLink></li>

  
            </ul>
        </nav>
       </div>

    </header>
    <Outlet/></>

  )
}




export default Admin