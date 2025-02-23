const User=require('../models/user_model')
const Contact=require('../models/contactSchema')
const getAllUser=async(req,res ,next)=>{
try {
    const users=await User.find({},{password:0});
    if(!users || users.length===0){
        return res.status(404).json({message:"No users Found"})
    }
    console.log(users);
    
    return res.status(200).json(users)
    
} catch (error) {
    next(error)
}
}

const getAllContacts=async(req,res,next)=>{
    try {
        const contacts=await Contact.find();
        if(!contacts || contacts.length===0){
            return res.status(404).json({message:"No users Found"})
        }
        console.log(contacts);
        
        return res.status(200).json(contacts)
        
    } catch (error) {
        next(error)
    }
}
const deleteUserById=async(req ,res,next)=>{
    try {
        const id=req.params.id;
        await User.deleteOne({_id:id});
        return res.status(200).json({message:"User Deleted Successfully"})
    } catch (error) {
        next(error)
    }

}
const getUserById=async(req ,res,next)=>{
    try {
        const id=req.params.id;

        const user=await User.findOne({_id:id},{password:0});
        if(!user){
            return res.status(404).json({message:"No user Found"})
        }
        console.log(user);
        
        return res.status(200).json(user)
        
    } catch (error) {
        next(error)
    }

}
const updateUserById=async(req ,res)=>{
    try {
        const id=req.params.id;
const updateUser=req.body
        const updatedData=await User.updateOne({_id:id},{$set:updateUser});
        if(!updatedData){
            return res.status(404).json({message:"No user Found"})
        }
        console.log(updatedData);
        
        return res.status(200).json(updatedData)
        
    } catch (error) {
        next(error)
    }

}

const deleteContactById=async(req ,res,next)=>{
    try {
        const id=req.params.id;
        await Contact.deleteOne({_id:id});
        return res.status(200).json({message:"User Deleted Successfully"})
    } catch (error) {
        next(error)
    }

}
module.exports={getAllUser,getAllContacts,deleteUserById,getUserById,updateUserById,deleteContactById}