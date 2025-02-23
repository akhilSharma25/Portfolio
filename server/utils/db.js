const mongoose=require('mongoose')
const password="AKHIL2005"

const URL=process.env.MONGODB_URI
const connectDb=async()=>{
    try {

        await mongoose.connect(URL)
        console.log("DB Connection SuccessFul");
        
        
    } catch (error) {
        console.log(error);
        process.exit(0)
        
    }
}
module.exports=connectDb