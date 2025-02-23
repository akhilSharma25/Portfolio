import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useAuth } from '../store/auth'
import {Link} from "react-router-dom"

export const AdminUsers = () => {

    const [user,setUser]=useState([]);
    const {authorizationToken}=useAuth()
    const getAllUserData=async()=>{
        try {
            
            const response=await fetch("http://localhost:3000/api/admin/users",{
                method:"GET",
                headers:{
                    Authorization:authorizationToken
                }
            })
            if (!response.ok) {
                toast("Failed to fetch user data");
              }
            const data=await response.json();
            console.log(data);
            
            setUser(data)
            
        } catch (error) {
            toast.warn("User is not admin")
        }
    }

    useEffect(()=>{
        getAllUserData()
    },[])


    const deleteUser=async(id)=>{

      try {
        console.log(id)
        const response=await fetch(`http://localhost:3000/api/admin/users/delete/${id}`,{
            method:"DELETE",
            headers:{
                Authorization:authorizationToken
            }
        })
        if (response.ok) {
            getAllUserData()
            return;
          }
          const data =await response.json()
          toast(data)
      } catch (error) {
        if (!response.ok) {
            toast("Failed to fetch user data");
            return;
          }
        console.log("Error in Admin ");
        
      }
        
    }
  return (

<>
<section>
    <div className="container">
        <h1>Admin User Data</h1>
    </div>
    <div className="container admin-users">
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
            {user.map((currUser,index)=>{
    return(
        <tr key={index}>
            <td>{currUser.username}</td>
            <td>{currUser.email}</td>
            <td>{currUser.phone}</td>
            <td><Link to={`/admin/users/${currUser._id}/edit`}>Edit</Link></td>
            <td><button onClick={()=>deleteUser(currUser._id)}>Delete</button></td>
          
        </tr>
    )

})}
            </tbody>
        </table>

    </div>
</section>


</>
)
}
