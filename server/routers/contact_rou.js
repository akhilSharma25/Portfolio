const express=require('express');
const router=express.Router()
const contactForm=require('../controllers/contact_controller');
const { contactSchema } = require('../validators/auth-validator');
const validate = require('../middlewares/validate_midlleware');


router.route("/contact").post(validate(contactSchema),contactForm)


module.exports=router