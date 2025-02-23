const express=require('express');
const router=express.Router()
const validate=require('../middlewares/validate_midlleware')
const contactForm=require('../controllers/contact_controller')

const auth=require('../controllers/auth_controllers');
const {signupSchema,contactSchema,loginSchema} = require('../validators/auth-validator');
const authMiddleWare = require('../middlewares/authMiddleWare');
router.route("/").get(auth.home)
router.route("/register").post(validate(signupSchema), auth.register)
router.route("/login").post(validate(loginSchema),auth.login)
router.route('/user').get(authMiddleWare,auth.user)



module.exports=router