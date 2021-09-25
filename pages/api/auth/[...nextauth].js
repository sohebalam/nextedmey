import NextAuth from "next-auth"
import Providers from "next-auth/providers"
import bcrypt from "bcryptjs"
import User from "../../../models/userModel"
import connectDB from "../../../connectDB"

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Providers.Twitter({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
    }),
    Providers.LinkedIn({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    }),

    Providers.Credentials({
      async authorize(credentials) {
        connectDB()

        const { email, password } = credentials

        // console.log(credentials)

        // Check if email and password is entered
        if (!email || !password) {
          throw new Error("Please enter email or password")
        }

        // Find user in the database
        const user = await User.findOne({ email }).select("+password")

        if (!user) {
          throw new Error("Invalid Email or Password")
        }

        // Check if password is correct or not
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
          throw new Error("Invalid Email or Password")
        }

        return Promise.resolve(user)
      },
    }),
  ],
  pages: {
    signIn: "/user/login",
  },
  callbacks: {
    jwt: async (token, user) => {
      user && (token.user = user)
      return Promise.resolve(token)
    },
    session: async (session, user) => {
      session.user = user.user
      return Promise.resolve(session)
    },
  },
})
