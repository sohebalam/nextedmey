import nc from "next-connect"
import connectDB from "../../../../connectDB"
import formidable from "formidable"
// import { readCourse } from "../../../controllers/courseCont"

import onError from "../../../../middlewares/errors"

import { isAuthenticated, isInstructor } from "../../../../middlewares/auth"
import { deleteLesson } from "../../../../controllers/courseCont"

const router = nc({ onError })

connectDB()

// console.log(req.method)

router.use(isAuthenticated, isInstructor).post(deleteLesson)

export default router
