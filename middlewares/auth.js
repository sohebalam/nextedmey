import catchAsyncErrors from "../middlewares/catchAsyncErrors"
import ErrorHandler from "../utils/errorHandler"
import { getSession } from "next-auth/client"
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
