import mongoose from "mongoose"

const userSchema = mongoose.Schema({
  socialId: {
    type: String,
    required: false,
    index: {
      unique: true,
      partialFilterExpression: { socialId: { $type: "string" } },
    },
    default: null,
  },
  name: {
    type: String,
    required: true,
    maxLength: [50, "Your name cannot exceed 50 characters"],
  },
  email: {
    type: String,
    required: false, // only required for facebook users
    index: {
      unique: true,
      partialFilterExpression: { email: { $type: "string" } },
    },
    default: null,
    lowercase: true,
  },
  password: {
    type: String,
    // required: true,
    // minLength: [6, "Your password must be at least 6 characters"],
    select: false,
  },
  //   role: {
  //     type: String,
  //     default: "user",
  //   },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetToken: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    default: "user",
  },
})

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User
