import catchAsyncErrors from "../middlewares/catchAsyncErrors"
import User from "../models/userModel"
// import { Social } from "../socialModel"

import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { sendEmail } from "../middlewares/sendMail"
import validator from "validator"
import queryString from "query-string"

const stripe = require("stripe")(process.env.STRIPE_SECRET)

export const registerUser = catchAsyncErrors(async (req, res) => {
  console.log(req.method)

  const { name, email, password, conPassword } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" })
  }

  if (password !== conPassword) {
    return res.status(400).json({ message: "Passwords do not match" })
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" })
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Not a valid email" })
  }

  const userExists = await User.findOne({ email })

  if (userExists) {
    return res.status(400).json({ message: "user exists" })
  }

  const salt = await bcrypt.genSalt(12)
  const user = await User.create({
    name,
    email,
    password: await bcrypt.hash(password, salt),
  })

  res.status(200).json({
    success: true,
    message: "Account Registered successfully",
  })
})

export const currentUserProfile = catchAsyncErrors(async (req, res) => {
  if (req.user.id) {
    const dbUser = await User.findOne({ socialId: req.user.id })
    res.status(200).send(dbUser)
  } else {
    const dbUser = await User.findById(req.user._id)

    res.status(200).send(dbUser)
  }
})

export const updateProfile = async (req, res) => {
  // console.log(req.user._id)

  if (req.user.id) {
    const user = await User.findOne({ socialId: req.user.id })

    if (user) {
      user.name = req.body.name

      if (req.body.password) {
        if (req.body.password < 6) {
          return res
            .status(400)
            .json({ message: "password must be at least 6 characters" })
        }

        const salt = await bcrypt.genSalt(12)
        user.password = await bcrypt.hash(req.body.password, salt)
      }
    }
    if (user.email) {
      const { email } = user

      user.email = req.body.email
    }
    await user.save()
    res.status(200).json({
      success: true,
    })
  } else {
    const user = await User.findById(req.user._id)
    if (user) {
      user.name = req.body.name
      if (req.body.password) {
        if (req.body.password < 6) {
          return res
            .status(400)
            .json({ message: "password must be at least 6 characters" })
        }
        const salt = await bcrypt.genSalt(12)
        user.password = await bcrypt.hash(req.body.password, salt)
      }
    }
    if (user.email) {
      const { email } = user

      user.email = req.body.email
    }
    await user.save()
    res.status(200).json({
      success: true,
    })
  }
}

export const forgotPassword = async (req, res) => {
  // Send Email to email provided but first check if user exists
  const { email } = req.body

  console.log(email)

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ message: "email doesn't exist" })
    }

    // Reset Token Gen and add to database hashed (private) version of token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    })

    user.resetToken = token
    // console.log(user)
    await user.save()

    const link = `${process.env.API}/user/reset/${token}`
    // HTML Message
    const message = `
      
      <div>Click the link below to reset your password or if the link is not working, please paste it into your browser</div><br/>
      <div>${link}</div>
    `

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      })

      res.status(200).json({
        message: `Email Sent to ${user.email}, please check your email`,
      })
    } catch (err) {
      console.log(err)

      user.resetToken = undefined

      await user.save()

      return res.status(500).json({ messsage: "Email could not be sent" })
    }
  } catch (error) {
    console.log(error)
  }
}

export const resetPassword = async (req, res) => {
  const { resetToken } = req.query

  const { password, conPassword } = req.body

  if (password !== conPassword) {
    return res.status(400).json({ message: "Passwords do not match be" })
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" })
  }

  if (resetToken) {
    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET)
    req.user = decoded
  }

  try {
    const user = await User.findById(req.user._id)

    if (user) {
      const salt = await bcrypt.genSalt(10)
      if (req.body.password) {
        if (req.body.password < 6) {
          return res
            .status(400)
            .json({ message: "password must be at least 6 characters" })
        }
        user.password = await bcrypt.hash(req.body.password, salt)
      }
      user.resetToken = undefined
      await user.save()
      return res.status(200).json({
        message: `success in updating user`,
      })
    }
  } catch (error) {
    res.status(500)
    throw new Error("Server Error")
  }
}

export const socialRegister = catchAsyncErrors(async (req, res) => {
  const { name, email, password, id } = req.body

  // console.log(req.body)
  if (req.body.id) {
    const userExists = await User.findOne({ socialId: req.body.id })

    // res.status(403).json({
    //   message: "Email exists please login",
    // })

    if (userExists) {
      return
    }
  }
  if (password) {
    var salt = bcrypt.genSaltSync(10)
    var hashPassword = bcrypt.hashSync(password, salt)
  }

  const user = await User.create({
    socialId: id,
    name,
    email,
    password: hashPassword || "",
  })

  res.status(200).json({
    success: true,
    message: "Account Registered successfully",
  })
})

export const allAdminUsers = catchAsyncErrors(async (req, res) => {
  const users = await User.find()

  res.status(200).json({
    success: true,
    users,
  })
})

export const getUserDetails = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.query.id)

  if (!user) {
    return next(new ErrorHandler("User not found with this ID", 400))
  }

  res.status(200).json({
    success: true,
    user,
  })
})

export const updateUserDetails = catchAsyncErrors(async (req, res) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  }

  const user = await User.findByIdAndUpdate(req.query.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })

  res.status(200).json({
    success: true,
  })
})

export const deleteUser = catchAsyncErrors(async (req, res) => {
  // console.log(req.method, req.query.id)
  const user = await User.findByIdAndDelete(req.query.id)

  console.log(user)

  if (!user) {
    return next(new ErrorHandler("User not found with this ID", 400))
  }

  res.status(200).json({
    success: true,
    user,
  })
})

// export const newInstructor = async (req, res) => {
//   console.log(req.method)
//   return
// }

export const newInstructor = async (req, res) => {
  try {
    if (req.user.id) {
      const user = await User.findOne({ socialId: req.user.id })

      req.user._id = user._id
    }
    // console.log(req.method)
    // 1. find user from db
    const user = await User.findById(req.user._id).exec()
    // console.log(user)
    // 2. if user dont have stripe_account_id yet, then create new
    if (!user.stripe_account_id) {
      // const account = await stripe.accounts.create({ type: "standard" })
      const account = await stripe.accounts.create({ type: "express" })
      // console.log("ACCOUNT => ", account.id)
      user.stripe_account_id = account.id
      user.save()
    }
    // 3. create account link based on account id (for frontend to complete onboarding)
    let accountLink = await stripe.accountLinks.create({
      account: user.stripe_account_id,
      refresh_url: process.env.NEXT_PUBLIC_STRIPE_REDIRECT_URL,
      return_url: process.env.NEXT_PUBLIC_STRIPE_REDIRECT_URL,
      type: "account_onboarding",
    })
    // console.log(accountLink)
    // 4. pre-fill any info such as email (optional), then send url resposne to frontend
    accountLink = Object.assign(accountLink, {
      "stripe_user[email]": user.email,
    })
    // 5. then send the account link as response to fronend
    res.send(`${accountLink.url}?${queryString.stringify(accountLink)}`)
  } catch (err) {
    console.log("MAKE INSTRUCTOR ERR ", err)
  }
}

export const AccountStatus = async (req, res) => {
  try {
    console.log(req.user._id)

    const user = await User.findById(req.user._id).exec()
    const account = await stripe.accounts.retrieve(user.stripe_account_id)
    // console.log("ACCOUNT => ", account)
    if (!account.charges_enabled) {
      return res.staus(401).send("Unauthorized")
    } else {
      const statusUpdated = await User.findByIdAndUpdate(
        user._id,
        {
          stripe_seller: account,
          role: "instructor",
        },
        { new: true }
      )
        .select("-password")
        .exec()
      res.json(statusUpdated)
    }
  } catch (err) {
    console.log(err)
  }
}
