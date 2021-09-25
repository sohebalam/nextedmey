import nc from "next-connect"
import connectDB from "../../../connectDB"
// import cors from "cors"
import { readCourse, update } from "../../../controllers/courseCont"
import { CorsNext } from "../../../middlewares/mid"

import onError from "../../../middlewares/errors"
import next from "next"
import { isAuthenticated, isInstructor } from "../../../middlewares/auth"

const router = nc({ onError })

connectDB()

router.use(isAuthenticated, isInstructor).get(readCourse)
router.use(isAuthenticated, isInstructor).put(update)

export default router
