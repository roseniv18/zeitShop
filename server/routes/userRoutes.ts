import express from "express"
import {
    registerUser,
    loginUser,
    updateContactInfo,
    addToWishlist,
    removeFromWishlist,
    addReview,
    deleteReview,
} from "../controllers/userController"
const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.patch("/updateContactInfo", updateContactInfo)
router
    .post("/addToWishlist", addToWishlist)
    .delete("/removeFromWishlist", removeFromWishlist)

router.post("/addReview", addReview).delete("/deleteReview", deleteReview)

export default router
