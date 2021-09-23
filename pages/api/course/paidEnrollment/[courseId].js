import nc from "next-connect"
import connectDB from "../../../../connectDB"
// import cors from "cors"
import NextCors from "nextjs-cors"
import { paidEnrollment } from "../../../../controllers/courseCont"
import { isAuthenticated } from "../../../../middlewares/auth"
import onError from "../../../../middlewares/errors"
import next from "next"

const router = nc({ onError })

connectDB()

// export const config = {
//   api: {
//     bodyParser: {
//       sizeLimit: "5mb",
//     },
//   },
// }

// router.use(CorsNext).post(uploadImage)
router.use(isAuthenticated).post(paidEnrollment)

export default router
