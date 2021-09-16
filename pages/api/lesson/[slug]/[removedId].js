import nc from "next-connect"
import connectDB from "../../../../connectDB"
// import { readCourse } from "../../../controllers/courseCont"

import onError from "../../../../middlewares/errors"

import { isAuthenticated, isInstructor } from "../../../../middlewares/auth"
import { removeLesson } from "../../../../controllers/courseCont"

const router = nc({ onError })

connectDB()

router.use(isAuthenticated, isInstructor).put(removeLesson)

export default router
