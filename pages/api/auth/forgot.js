import nc from "next-connect"
import connectDB from "../../../connectDB"

import { forgotPassword } from "../../../controllers/authCont"

import onError from "../../../middlewares/errors"

const router = nc({ onError })

connectDB()

router.post(forgotPassword)

export default router
