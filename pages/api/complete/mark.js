import nc from "next-connect"
import connectDB from "../../../connectDB"

import onError from "../../../middlewares/errors"
import { isAuthenticated } from "../../../middlewares/auth"
import { markCompleted } from "../../../controllers/courseCont"

const router = nc({ onError })

connectDB()

// console.log("here")

router.use(isAuthenticated).post(markCompleted)

export default router
