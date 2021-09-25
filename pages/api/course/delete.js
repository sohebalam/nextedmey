import nc from "next-connect"
import connectDB from "../../../connectDB"
// import cors from "cors"
import NextCors from "nextjs-cors"
import { removeImage } from "../../../controllers/courseCont"
import { CorsNext } from "../../../middlewares/mid"

import onError from "../../../middlewares/errors"
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
router.post(removeImage)

export default router
