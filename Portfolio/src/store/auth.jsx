import { createContext, useContext, useEffect, useState } from "react";
import {toast} from "react-toastify"


export const AuthContext=createContext();


export const AuthProvider=({children})=>{


    const [token,setToken]=useState(localStorage.getItem("token"))
    const [user,setUser]=useState()
    const[isLoading,setIsLoading]=useState(true)

    const [services,setServices]=useState("")
    const authorizationToken=`Bearer ${token}`

    const storeTokenInLocalStr=(serverToken)=>{
        setToken(serverToken);  // Update React state

           return localStorage.setItem('token',serverToken)
    }


    let isLoggedIn=!!token
    //tackle logout
    const logOutUser=()=>{
        setToken("")
        return localStorage.removeItem("token")
    }

    //jwt authentication -- to get the currently logIn user active data

    const userAuthentication=async()=>{
        try {
            setIsLoading(true)
              // Check if the token is missing or empty
    if (!token) {
        console.log("Token is missing or empty");
        return;
      }
            const response=await fetch("https://portfolio-pdrk.onrender.com/api/auth/user",{
                method:"GET",
                headers:{
                    Authorization:authorizationToken
                }
            })

            if(response.ok){
                const data=await response.json()
                console.log("DATA",data.userData);
                setUser(data.userData)
                setIsLoading(false)

                
            }else {
                setIsLoading(false)

                // Handle response errors (e.g., 401 Unauthorized)
                const errorData = await response.json();
                console.log("Error fetching user data:", errorData);}
        } catch (error) {
            console.log("error Fetching user data");
            
        }

    }

    // to fetch the data from db
    const getServices=async()=>{
        
         try {
            const response=await fetch("https://portfolio-pdrk.onrender.com/api/data/service",{
                method:"GET" })
            
             if(response.ok){
                const data=await response.json()
                console.log(data.message);
                setServices(data.message)
             }else {
                console.log(`Error fetching services: ${response.status} ${response.statusText}`);
                // Optionally handle the error and show a user-friendly message
              }
          
         } catch (error) {
            
                const errorData = await response.json();
                console.log("Error:", errorData);
                       
         }
    
    }
    
useEffect(()=>{
    getServices()
if(token){
        userAuthentication()

}},[token])
    return (
        <AuthContext.Provider value={{isLoggedIn,storeTokenInLocalStr,logOutUser,user,services,authorizationToken,isLoading}} >
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth=()=>{
    const authContextValue= useContext(AuthContext)
    // console.log(authContextValue);//
    
    if(!authContextValue){
       toast.warning("You haven't access of this page")
    }
    return authContextValue
}

