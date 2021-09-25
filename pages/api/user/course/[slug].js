import nc from "next-connect"
import connectDB from "../../../../connectDB"
// import cors from "cors"
import { readCourse } from "../../../../controllers/courseCont"

import onError from "../../../../middlewares/errors"
import { isAuthenticated, isEnrolled } from "../../../../middlewares/auth"

const router = nc({ onError })

connectDB()

router.use(isAuthenticated, isEnrolled).get(readCourse)

export default router
