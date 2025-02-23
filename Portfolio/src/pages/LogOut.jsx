import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../store/auth'
const LogOut = () => {

    const {logOutUser}=useAuth()
    useEffect(()=>{
        logOutUser();
    },[logOutUser])
  return <Navigate to="/login"/>
}

export default LogOut