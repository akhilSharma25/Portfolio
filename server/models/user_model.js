const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//middleware signup
// zod 

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

//middle hash pass
userSchema.pre("save", async function (next) {
  console.log("this", this);
  try {
    const user = this;

    // Check if the password is modified
    if (user.isModified("password")) {
      const saltRound = await bcrypt.genSalt(10);
      const hash_password = await bcrypt.hash(user.password, saltRound);
      user.password = hash_password;
    }

    next(); // `next` function define nahi kiya gaya.
  } catch (error) {
    console.log("Error in hashing password:", error);
    next(error);
  }
});



// login compare

userSchema.methods.comparePassword=async function(password) {

    return await bcrypt.compare(password,this.password)
    
}
//jwt token
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30min",
      }
    );
  } catch (error) {
    console.log(error);
    next(error)

  }
}; 



//collection

const User = new mongoose.model("User", userSchema);

module.exports = User;
