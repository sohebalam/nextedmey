import nc from "next-connect"
import connectDB from "../../../connectDB"

import { registerUser } from "../../../controllers/authCont"

import onError from "../../../middlewares/errors"

const router = nc({ onError })

connectDB()

router.post(registerUser)

export default router
