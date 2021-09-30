import catchAsyncErrors from "./catchAsyncErrors"
import ErrorHandler from "../utils/errorHandler"
import { getSession } from "next-auth/client"
import User from "../models/userModel"
import Course from "../models/courseModel"

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
  // console.log(req.user._id)
  const user = await User.findById(req.user._id).exec()
  console.log(user)
  if (!user.role.includes("instructor")) {
    console.log("not instructor")
    return res.status(403)
  } else {
    console.log("yes")
    next()
  }

  //   if (req.user.id) {
  //     const user = await User.findOne({ socialId: req.user.id }).exec()
  //     console.log(user)
  //     if (!user.role.includes("instructor")) {
  //       console.log("not instructor")
  //       return res.status(403)
  //     } else {
  //       console.log("yes")
  //       next()
  //     }
  //   } else {
  //     const user = await User.findById(req.user._id).exec()
  //     if (!user.role.includes("instructor")) {
  //       console.log("not instructor")
  //       return res.status(403)
  //     } else {
  //       console.log("yes")
  //       next()
  //     }
  //   }
})

export const isEnrolled = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).exec()
    const course = await Course.findOne({ slug: req.query.slug }).exec()

    // console.log(course)

    // check if course id is found in user courses array
    let ids = []
    for (let i = 0; i < user.courses.length; i++) {
      ids.push(user.courses[i].toString())
    }

    if (!ids.includes(course._id.toString())) {
      res.sendStatus(403)
    } else {
      next()
    }
  } catch (err) {
    console.log(err)
  }
}
