import nc from "next-connect"
import connectDB from "../../../../connectDB"

import { resetPassword } from "../../../../controllers/authCont"

import onError from "../../../../middlewares/errors"

const router = nc({ onError })

connectDB()

router.put(resetPassword)

export default router
