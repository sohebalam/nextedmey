import nc from "next-connect"
import connectDB from "../../../../../connectDB"

import onError from "../../../../../middlewares/errors"
import { isAuthenticated, isInstructor } from "../../../../../middlewares/auth"
import { updateLesson } from "../../../../../controllers/courseCont"

const router = nc({ onError })

connectDB()

// console.log("here")

router.use(isAuthenticated, isInstructor).put(updateLesson)

export default router
