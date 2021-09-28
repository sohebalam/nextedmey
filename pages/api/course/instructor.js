import nc from "next-connect"
import connectDB from "../../../connectDB"
import { instructorCourses } from "../../../controllers/courseCont"

import onError from "../../../middlewares/errors"
import { isAuthenticated, isInstructor } from "../../../middlewares/auth"

const router = nc({ onError })

connectDB()

router.use(isAuthenticated, isInstructor).get(instructorCourses)

export default router
