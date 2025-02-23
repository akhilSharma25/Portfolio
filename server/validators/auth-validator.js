//create obj schema
const z = require("zod");

// Schema for user registration
const signupSchema = z.object({
  username: z
    .string({ required_error: "Username is required." })
    .trim()
    .min(3, { message: "Username must be at least 3 characters long." })
    .max(255, { message: "Username cannot exceed 255 characters." }),

  email: z
    .string({ required_error: "Email is required." })
    .trim()
    .email({ message: "Please enter a valid email address." }),

  phone: z
    .string({ required_error: "Phone number is required." })
    .trim()
    .min(10, { message: "Phone number must be at least 10 digits long." })
    .max(12, { message: "Phone number cannot exceed 12 digits." }),

  password: z
    .string({ required_error: "Password is required." })
    .trim()
    .min(7, { message: "Password must be at least 7 characters long." })
    .max(1024, { message: "Password cannot exceed 1024 characters." }),
});

// Schema for contact form validation
const contactSchema = z.object({
  username: z
    .string({ required_error: "Username is required." })
    .trim()
    .min(1, { message: "Username cannot be empty." })
    .max(50, { message: "Username cannot exceed 50 characters." }),

  email: z
    .string({ required_error: "Email is required." })
    .trim()
    .email({ message: "Please enter a valid email address." }),

  message: z
    .string({ required_error: "Message is required." })
    .trim()
    .min(1, { message: "Message cannot be empty." })
    .max(500, { message: "Message cannot exceed 500 characters." }),
});

// Schema for user login validation
const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required." })
    .trim()
    .email({ message: "Please enter a valid email address." }),

  password: z
    .string({ required_error: "Password is required." })
    .trim()
    .min(6, { message: "Password must be at least 6 characters long." }),
});

module.exports = { signupSchema, contactSchema, loginSchema };




// /*
// Samajh gaya! Aapka confusion yeh hai ki Zod validation ko use kar rahe ho, lekin Mongoose model (userSchema) kaise kaam kar raha hai, aur dono kaise interact karte hain.

// Zod Validation aur Mongoose Schema ka Integration:
// Zod validation ko aap apne request ke body ko validate karne ke liye use kar rahe ho, lekin Mongoose ka schema (userSchema) apne database mein data ko structure karne aur usse interact karne ke liye use hota hai. Mongoose model ki zarurat isliye hoti hai taaki aap MongoDB ke saath data operations (create, read, update, delete) kar sakein.

// Zod sirf input validation ke liye hota hai, jabki Mongoose schema MongoDB ke data ko model karta hai.

// Flow Explanation:
// Zod Validation:

// Zod validation aapke request body ko check karta hai, jaise username, email, phone, password.
// Agar request body ka data valid hota hai, toh woh req.body mein parsed data ko store kar leta hai, aur phir next() call hota hai jo request ko aage badhata hai.
// Mongoose Schema:

// Mongoose ka schema User model ke through define hota hai. Jab data Zod validation pass kar leta hai, tab aap woh validated data Mongoose model ke through database mein insert karte ho.
// pre('save') middleware: Jab bhi aap Mongoose model se user create karte ho (User.create()), toh yeh middleware trigger hota hai. Yeh middleware password ko hash karta hai (agar password modify kiya gaya ho).
// How Zod and Mongoose Interact:
// Zod Validation:

// Aap Zod ko request body ko validate karne ke liye use karte ho.
// Agar validation pass ho jata hai, toh req.body mein validated data aata hai.
// Mongoose Model (userSchema):

// Mongoose model ko use karke aap database mein data ko insert karte ho, jaise User.create().
// Password Hashing: Agar password change hota hai, toh userSchema.pre('save') middleware password ko hash karta hai.
// Generate Token: generateToken() method ko call karke JWT token generate karte ho.
// Example of How Both Work Together:
// 1. Zod Validation (signupSchema):    