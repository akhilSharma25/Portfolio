const Contact=require('../models/contactSchema')

const contactForm=async(req,res)=>{
    try {
        const { username, email, message } = req.body;

        // Create a new contact entry in the database
        const newContact = await Contact.create({ username, email, message });
console.log(newContact);

        res.status(201).json({
            message: "Contact form submitted successfully",
            data: newContact,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error submitting contact form",
            error: error.message,
        });
        
    }
}

module.exports=contactForm