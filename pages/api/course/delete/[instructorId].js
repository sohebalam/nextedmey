import nc from "next-connect"
import connectDB from "../../../../connectDB"
import { removeVideo } from "../../../../controllers/courseCont"

import onError from "../../../../middlewares/errors"
import { isAuthenticated, isInstructor } from "../../../../middlewares/auth"

const router = nc({ onError })

connectDB()

// console.log("here")

router.use(isAuthenticated, isInstructor).put(removeVideo)

export default router
