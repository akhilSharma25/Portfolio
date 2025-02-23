const jwt=require('jsonwebtoken')
const User=require('../models/user_model')

const authMiddleWare=async(req,res,next)=>{

    const token=req.header('Authorization');
    if(!token){
        return res.status(401).json({message:"Unauthorized HTTP,Token is not provided"})
    }

    console.log('token from auth middleware',token);
    
    // we are assuming token is in the format "Bearer <jwtToken> ,removing the "Bearer Prefix"
    const jwtToken=token.replace('Bearer',"").trim()

    try {

        const isVerified= jwt.verify(jwtToken,process.env.JWT_SECRET_KEY)
        console.log('Verified Payload:', isVerified);
         
        const userData= await User.findOne({email:isVerified.email}).select({password:0})
        console.log(userData);
        

        //custom property
        req.user=userData
        req.token=token
        req.userId=userData._id;
        next()
        
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Unauthorized: Token expired" });
        }
        return res.status(401).json({ message: "Unauthorized: Invalid token" });        
    }
   
}


module.exports=authMiddleWare