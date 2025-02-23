const mongoose=require("mongoose")

console.log("hello");

const contactSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
    ,
    message:{
        type:String,
        required:true
    }
})


//colllection

const Contact=new mongoose.model('Contacts',contactSchema)
module.exports=Contact