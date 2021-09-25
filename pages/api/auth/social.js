import nc from "next-connect"
import connectDB from "../../../connectDB"

import { socialRegister } from "../../../controllers/authCont"

import onError from "../../../middlewares/errors"

const router = nc({ onError })

connectDB()

router.post(socialRegister)

export default router
