import nc from "next-connect"
import connectDB from "../../../../../connectDB"
// import cors from "cors"
import NextCors from "nextjs-cors"
import {
  paidEnrollment,
  removeImage,
} from "../../../../../controllers/courseCont"

import onError from "../../../../../middlewares/errors"
import next from "next"
import { isAuthenticated } from "../../../../../middlewares/auth"

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
