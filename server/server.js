import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import dotenv from 'dotenv';
dotenv.config();
const express=require('express');
const app=express()
const cors=require('cors')
const PORT=process.env.PORT ||3000
const authRouter=require('./routers/auth_router')
require('./models/user_model')
const connectDb=require("./utils/db");
const errorMiddleware = require('./middlewares/err_middleware');
const contactRoute=require("./routers/contact_rou");
const servicesRoute = require('./routers/service-rout');
const adminRoute=require('./routers/admin-router')
const path=require("path")


const __dirname=path.resolve()
//handle cors
const corsOptions={
    origin:"https://portfolio-pdrk.onrender.com",
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

app.use(express.static(path.join(__dirname,"/Portfolio/dist")))
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,"Portfolio","dist","index.html"))
})

app.use(errorMiddleware);
connectDb().then(()=>{

app.listen(PORT,(req,res)=>{
    console.log(`Server is listening at ${PORT}`);
    
})})