
const validate=(schema)=>async(req,res,next)=>{

    try {
// y check krega zod s define schema or user schema is match or not
        const parseBody=await schema.parseAsync(req.body)
        req.body=parseBody
        next()
    } catch (error) {
        if (error.errors) {
            const err = {
                status: 400,
                message: "Validation Error",
                extraDetails: error.errors.map((err) => err.message).join(", ") // Combine all validation messages
            };
            return next(err);
        }
        next(error)


        // res.status(400).json({msg:error.errors[0].message})
    }

}

module.exports=validate