import express from "express"
import { signup, login , logout,refreshTokens } from "../controllers/auth.controller.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()


router.post("/signup", signup)

router.post("/login", login)

router.post("/logout", logout);

router.post('/refresh-token', refreshTokens)


// test


// router.get('/profile', protect , getProfile)
 
export default router