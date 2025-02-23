// home logic
const User = require("../models/user_model");
const bcrypt = require("bcryptjs");
const home = async (req, res) => {
  try {
    res.status(200).send("Router Hello Guys");
  } catch {
    console.log(e);
  }
};
const register = async (req, res,next) => {
  try {
    console.log(req.body);

    const { username, email, phone, password } = req.body;
    if (!username || !email || !phone || !password) {
      alert("All fields are required.");
      return res.status(400).json({ message: "All fields are required." });

    }
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(400).send({message:"email already exist"});
    }

    //hash the password

    const userCreate = await User.create({ username, email, phone, password });
    res
      .status(201)
      .json({
        msg: "Registration Done",
        token: await userCreate.generateToken(),
        userId: userCreate._id.toString(),
      });
  } catch (error) {
    console.log(error);
    const status=422;
    const message="Fill the input properly"
    const extraDetails=error.errors[0].message
    const err={
      status,message,extraDetails
    }
    next(err)
  } 
};

//login logic

const login = async (req, res,next) => {
  try {
    const {  email, password } = req.body;
    const userExist = await User.findOne({ email: email });
    if (!userExist) {
        
      return res.status(401).json({ message: "Invalid email or password" });

    }

    const userLogin=await userExist.comparePassword(password)
    if(userLogin){
        res
        .status(200)
        .json({
          msg: "Login Done",
          token: await userExist.generateToken(),
          userId: userExist._id.toString(),
        });
    }else{
        res.status(401).json({message:"Invalid password"})
    }
  } catch (error) {
    next({
      status: 500,
      message: "Internal Server Error",
      extraDetails: error.message || "An error occurred",
    });
  
  }
};


// user logic -> TO send  user data -
const user=async(req,res)=>{
  try {
    const userData=req.user
    console.log(userData);
    return res.status(200).json({userData})
    
  } catch (error) {
    console.log("Error From root",error);
    return res.status(500).json({ message: "Internal Server Error" }); // Ensure response is sent

    
  }
}


module.exports = { home, register, login,user };
