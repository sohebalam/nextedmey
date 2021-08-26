import nc from "next-connect"
import connectDB from "../../../connectDB"

import { currentUserProfile } from "../../../controllers/authCont"
import { isAuthenticated } from "../../../middlewares/auth"

import onError from "../../../middlewares/errors"

const router = nc({ onError })

connectDB()

router.use(isAuthenticated).get(currentUserProfile)

export default router
