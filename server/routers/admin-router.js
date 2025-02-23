const express=require("express")
const router=express.Router()
const {getAllUser,getAllContacts, deleteUserById, getUserById,updateUserById,deleteContactById}=require('../controllers/admin-controllers')

const authMiddleware=require("../middlewares/authMiddleWare")
const adminMiddleware = require("../middlewares/admin-middleware")
const authMiddleWare = require("../middlewares/authMiddleWare")
router.route('/users').get(authMiddleware,adminMiddleware,getAllUser)

router.route("/users/delete/:id").delete(authMiddleWare,adminMiddleware,deleteUserById)
router.route("/users/:id").get(authMiddleWare,adminMiddleware,getUserById)
router.route("/users/update/:id").patch(authMiddleWare,adminMiddleware,updateUserById)
router.route('/contacts').get(authMiddleware,adminMiddleware,getAllContacts)
router.route('/contacts/delete/:id').delete(authMiddleware,adminMiddleware,deleteContactById)

module.exports=router