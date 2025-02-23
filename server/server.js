require('dotenv').config()
const express=require('express');
const app=express()
const cors=require('cors')
const PORT=3000
const authRouter=require('./routers/auth_router')
require('./models/user_model')
const connectDb=require("./utils/db");
const errorMiddleware = require('./middlewares/err_middleware');
const contactRoute=require("./routers/contact_rou");
const servicesRoute = require('./routers/service-rout');
const adminRoute=require('./routers/admin-router')
//handle cors
const corsOptions={
    origin:"http://localhost:5173",
    methods:"GET,PUT,POST,DELETE,PATCH,HEAD",
    Credentials:true,
}
app.use(cors(corsOptions))

app.use(express.json());


app.use("/api/auth",authRouter)
app.use("/api/form",contactRoute)
app.use("/api/data",servicesRoute)

//admin
app.use("/api/admin",adminRoute)

app.use(errorMiddleware);
connectDb().then(()=>{

app.listen(PORT,(req,res)=>{
    console.log(`Server is listening at ${PORT}`);
    
})})