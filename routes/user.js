import express from 'express'
import passport from 'passport'
import { getAdminStats, getAdminUsers, logout, myProfile } from '../controllers/user.js'
import { authorizedAdmin, isAthenticated } from '../middlewares/auth.js'

const router = express.Router()

router.get("/googlelogin", passport.authenticate("google", {
    scope: ["profile"]
}))

router.get("/login", passport.authenticate("google", {
    successRedirect: process.env.FRONTEND_URL
}))

router.get("/me", isAthenticated, myProfile)
router.get("/logout", logout)

//admin middleware
router.get("/admin/users", isAthenticated, authorizedAdmin, getAdminUsers)
router.get("/admin/stats", isAthenticated, authorizedAdmin, getAdminStats)


export default router