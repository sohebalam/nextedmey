import nc from "next-connect"
import connectDB from "../../../connectDB"

import { AccountStatus } from "../../../controllers/authCont"
import { isAuthenticated } from "../../../middlewares/auth"

import onError from "../../../middlewares/errors"

const router = nc({ onError })

connectDB()

router.use(isAuthenticated).post(AccountStatus)

export default router
