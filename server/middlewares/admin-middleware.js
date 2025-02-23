const adminMiddleware=async(req ,res,next)=>{
    try {

        // console.log(req.user.isAdmin);
        const adminRole=req.user.isAdmin
        if(!adminRole){
            return res.status(403).json({message:"Access denied,User is not an admin"})
        }
        // res.status(200).json({msg:req.user.isAdmin})
        
  //  user is admin //
        next()
    } catch (error) {
        next(error)
    }
}

module.exports=adminMiddleware