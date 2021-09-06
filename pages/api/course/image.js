import nc from "next-connect"
import connectDB from "../../../connectDB"
// import cors from "cors"
import NextCors from "nextjs-cors"
import { uploadImage } from "../../../controllers/authCont"
// import { isAuthenticated } from "../../../middlewares/auth"

import onError from "../../../middlewares/errors"
import next from "next"

const router = nc({ onError })

connectDB()

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "3mb",
    },
  },
}

async function handler(req, res) {
  // Run the cors middleware
  // nextjs-cors uses the cors package, so we invite you to check the documentation https://github.com/expressjs/cors
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })

  // Rest of the API logic
  res.json({ message: "Hello NextJs Cors!" })
  console.log(req.body)
}

// router.use(handler).post(uploadImage)

export default handler
