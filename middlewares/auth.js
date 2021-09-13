import catchAsyncErrors from "./catchAsyncErrors"
import ErrorHandler from "../utils/errorHandler"
import { getSession } from "next-auth/client"
import User from "../models/userModel"
export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const session = await getSession({ req })

  // console.log(session)

  if (!session) {
    return next(new ErrorHandler("Login first to access this resource", 401))
  }
  req.user = session.user
  // console.log(req.user)
  next()
})

export const isInstructor = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id).exec()
  if (!user.role.includes("instructor")) {
    console.log("yes")
    return res.status(403)
  } else {
    next()
  }
})
