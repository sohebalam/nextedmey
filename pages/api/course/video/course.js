import nc from "next-connect"
import connectDB from "../../../../connectDB"
import formidable from "formidable"
// import { readCourse } from "../../../controllers/courseCont"

import onError from "../../../../middlewares/errors"

import { isAuthenticated, isInstructor } from "../../../../middlewares/auth"
import { uploadVideo } from "../../../../controllers/courseCont"
import formParser from "../../../../middlewares/formParser"

const router = nc({ onError })

connectDB()
export const config = {
  api: {
    bodyParser: false,
  },
}

// console.log(req.method)

router.use(isAuthenticated, isInstructor, formParser).post(uploadVideo)

export default router
