import nc from "next-connect"
import connectDB from "../../../connectDB"
import { create } from "../../../controllers/courseCont"
import { CorsNext } from "../../../middlewares/mid"

import onError from "../../../middlewares/errors"
import { isAuthenticated, isInstructor } from "../../../middlewares/auth"

const router = nc({ onError })

connectDB()

router.use(isAuthenticated, isInstructor).post(create)

export default router
