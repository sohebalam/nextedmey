import nc from "next-connect"
import connectDB from "../../../connectDB"

const router = nc()

connectDB()

router.post(login)

export default router
