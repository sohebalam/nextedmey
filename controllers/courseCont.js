import AWS from "aws-sdk"
import { nanoid } from "nanoid"
import Course from "../models/courseModel"
import slugify from "slugify"
import { readFileSync } from "fs"
import User from "../models/userModel"
// import Completed from "../models/completed"
const stripe = require("stripe")(process.env.STRIPE_SECRET)

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
}

const S3 = new AWS.S3(awsConfig)

export const uploadImage = async (req, res) => {
  // console.log(req.body)

  try {
    const { image } = req.body
    if (!image) return res.status(400).send("No image")

    // prepare the image
    const base64Data = new Buffer.from(
      image.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    )

    const type = image.split(";")[0].split("/")[1]

    // image params
    const params = {
      Bucket: "ofu-bucket",
      Key: `${nanoid()}.${type}`,
      Body: base64Data,
      ACL: "public-read",
      ContentEncoding: "base64",
      ContentType: `image/${type}`,
    }

    // upload to s3
    S3.upload(params, (err, data) => {
      if (err) {
        console.log(err)
        return res.status(400)
      }
      // console.log(data)
      res.send(data)
    })
  } catch (err) {
    console.log(err)
  }
}

export const removeImage = async (req, res) => {
  try {
    const { etag } = req.body
    // console.log(req.body)

    const params = {
      Bucket: etag.Bucket,
      Key: etag.Key,
    }

    // send remove request to s3
    S3.deleteObject(params, (err, data) => {
      if (err) {
        console.log(err)
        return res.status(400)
      }
      res.send({ ok: true })
    })
  } catch (err) {
    console.log(err)
  }
}

export const create = async (req, res) => {
  // console.log(req.method)
  // console.log("CREATE COURSE", req.body.price)
  // console.log(req.body)

  if (req.body.paid === true && req.body.price === 0) {
    req.body.price = 9.99
  }

  try {
    const alreadyExist = await Course.findOne({
      slug: slugify(req.body.title.toLowerCase()),
    })
    if (alreadyExist) return res.status(400).send("Title is taken")

    const course = await new Course({
      slug: slugify(req.body.title),
      instructor: req.user._id,
      ...req.body,
    }).save()

    res.status(200).json(course)
  } catch (err) {
    console.log(err)
    return res.status(400).send("Course create failed. Try again.")
  }
}

export const instructorCourses = async (req, res) => {
  // console.log(req.method)
  try {
    const courses = await Course.find({ instructor: req.user._id })
      .sort({ createdAt: -1 })
      .exec()
    res.status(200).json(courses)
  } catch (err) {
    console.log(err)
  }
}

export const readCourse = async (req, res) => {
  // console.log(req.method)
  const { slug } = req.query
  if (req.query) {
    // console.log(req.query)
  }

  // return
  try {
    // console.log(req.method)
    const course = await Course.findOne({ slug: slug })
      .populate("instructor", "_id name")
      .exec()
    res.json(course)
  } catch (error) {
    console.log(error)
  }
}

export const uploadVideo = async (req, res) => {
  // console.log(req.method)
  // console.log(req.query.instructorId)

  try {
    // console.log(req.user._id)

    if (req.user._id != req.query.instructorId) {
      return res.status(400).json({ message: "Unathorized" })
    }

    const { video } = req.files
    // console.log(video)

    if (!video) res.status(400).json({ message: "No Video" })

    const params = {
      Bucket: "ofu-bucket",
      Key: `${nanoid()}.${video.type.split("/")[1]}`,
      Body: readFileSync(video.path),
      ACL: "public-read",
      ContentType: video.type,
    }

    S3.upload(params, (err, data) => {
      if (err) {
        console.log(err)
        return res.status(400)
      }
      // console.log(data)
      res.send(data)
    })
  } catch (error) {
    console.log(error)
  }
}
export const removeVideo = async (req, res) => {
  // console.log(req.body)
  // console.log(req.method)

  try {
    if (req.user._id != req.query.instructorId) {
      return res.status(400).json({ message: "Unathorized" })
    }

    const { Bucket, Key } = req.body

    // console.log(video)
    // return

    const params = {
      Bucket,
      Key,
    }

    S3.deleteObject(params, (err, data) => {
      if (err) {
        console.log(err)
        return res.status(400)
      }
      // console.log(data)
      res.send({ ok: true })
    })
  } catch (error) {
    console.log(error)
  }
}

export const addLesson = async (req, res) => {
  try {
    const { slug, instructorId } = req.query
    const { title, content, video } = req.body
    if (req.user._id != instructorId) {
      return res.status(400).json({ message: "Unathorized" })
    }

    const updated = await Course.findOneAndUpdate(
      { slug },
      {
        $push: { lessons: { title, content, video, slug: slugify(title) } },
      },
      { new: true }
    )
      .populate("instructor", "_id name")
      .exec()

    res.json(updated)
  } catch (error) {
    console.log(error)
    return res.status(400).send("add lesson failed")
  }
}

export const update = async (req, res) => {
  try {
    const { slug } = req.query
    // console.log(slug)

    const course = await Course.findOne({ slug }).exec()

    if (req.user._id != course.instructor) {
      return res.status(400).json({ message: "Unathorized" })
    }

    const updated = await Course.findOneAndUpdate({ slug }, req.body, {
      new: true,
    }).exec()

    res.json(updated)
  } catch (error) {
    console.log(error)
    return res.status(400).send(error.message)
  }
}

export const removeLesson = async (req, res) => {
  try {
    const { slug, lessonId } = req.query
    console.log(lessonId)

    const course = await Course.findOne({ slug }).exec()
    if (req.user._id != course.instructor) {
      return res.status(400).send("Unauthorized")
    }

    const deletedlesson = await Course.findByIdAndUpdate(course._id, {
      $pull: { lessons: { _id: lessonId } },
    }).exec()

    res.json({ ok: true, deletedlesson })
  } catch (error) {
    console.log(error)
  }
}

export const updateLesson = async (req, res) => {
  // console.log(req.query, req.body)
  // return
  try {
    const { slug } = req.query
    console.log(slug)
    const { title, _id, content, video, free_preview } = req.body

    const course = await Course.findOne({ slug }).select("instructor").exec()
    console.log(course.instructor._id, title, _id, content, video, free_preview)

    if (req.user._id != course.instructor._id) {
      return res.status(400).json({ message: "Unathorized" })
    }

    const updated = await Course.updateOne(
      { "lessons._id": _id },
      {
        $set: {
          "lessons.$.title": title,
          "lessons.$.content": content,
          "lessons.$.video": video,
          "lessons.$.free_preview": free_preview,
        },
      },
      { new: true }
    ).exec()
    console.log("update", updated)
    res.json({ ok: true })
  } catch (error) {
    console.log(error)

    return res.status(400).send("Update lessons failed")
  }
}

export const publishCourse = async (req, res) => {
  try {
    const { courseId } = req.query
    const course = await Course.findById(courseId).select("instructor").exec()
    if (req.user._id != course.instructor._id) {
      return res.status(400).json({ message: "Unathorized" })
    }

    const updated = await Course.findByIdAndUpdate(
      courseId,
      { published: true },
      { new: true }
    ).exec()

    res.json(updated)
  } catch (error) {
    console.log(error)
    return res.status(400).send("Publish course failed")
  }
}

export const unpublishCourse = async (req, res) => {
  try {
    const { courseId } = req.query
    const course = await Course.findById(courseId).select("instructor").exec()
    if (req.user._id != course.instructor._id) {
      return res.status(400).json({ message: "Unathorized" })
    }
    const updated = await Course.findByIdAndUpdate(
      courseId,
      { published: false },
      { new: true }
    ).exec()

    res.json(updated)
  } catch (error) {
    console.log(error)
    return res.status(400).send("Un-ublish course failed")
  }
}

export const courses = async (req, res) => {
  try {
    const all = await Course.find({ published: true })
      .populate("instructor", "_id name")
      .exec()
    res.json(all)
  } catch (error) {}
}

export const checkEnrollment = async (req, res) => {
  try {
    const { courseId } = req.params

    const user = await User.findById(req.user._id).exec()

    let ids = []
    let length = user.courses && user.courses.length

    for (let i = 0; i < length; i++) {
      ids.push(user.courses[i].toString())
    }

    res.json({
      status: ids.includes(courseId),
      course: await Course.findById(courseId).exec(),
    })
  } catch (error) {
    console.log(error)
  }
}

export const freeEnrollment = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId).exec()
    if (course.paid) return
    const result = await User.findByIdAndUpdate(
      req.user._id,
      {
        $addToSet: { courses: course._id },
      },
      { new: true }
    ).exec()
    res.json({ message: "You have enrolled", course: course })
  } catch (error) {
    console.log(error)
    return res.status(400).send("Enrollment create failed")
  }
}

export const paidEnrollment = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId)
      .populate("instructor")
      .exec()
    if (!course.paid) return
    const fee = (course.price * 30) / 100

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          name: course.name,
          amount: Math.round(course.price.toFixed(2) * 100),
          currency: "gbp",
          quantity: 1,
        },
      ],
      payment_intent_data: {
        application_fee_amount: Math.round(course.price.toFixed(2) * 100),
        transfer_data: {
          destination: course.instructor.stripe_account_id,
        },
      },
      success_url: `${process.env.STRIPE_SUCCESS_URL}/${course._id}`,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    })
    const userUpdate = await User.findByIdAndUpdate(req.user._id, {
      stripeSession: session,
    }).exec()
    res.send(session.id)
  } catch (error) {
    console.log("Handle Payment", error)
    return res.status(400).send("Enrollment create falied")
  }
}

export const stripeSuccess = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId).exec()
    const user = await User.findById(req.user._id).exec()
    if (!user.stripeSession.id) return res.sendStatus(400)

    const session = await stripe.checkout.sessions.retrieve(
      user.stripeSession.id
    )
    console.log("Stripe success", session)
    if (session.payment_status === "paid") {
      await User.findByIdAndUpdate(user._id, {
        $addToSet: { courses: course._id },
        $set: { stripeSession: {} },
      }).exec()
      res.json({ success: true, course })
    }
    res.send(session.id)
  } catch (error) {
    console.log("stipe error", error)
  }
}

export const userCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).exec()
    const courses = await Course.find({ _id: { $in: user.courses } })
      .populate("instructor", "_id name")
      .exec()
    res.json(courses)
  } catch (error) {
    console.log(error)
  }
}

export const markCompleted = async (req, res) => {
  const { courseId, lessonId } = req.body
  // console.log(courseId, lessonId);
  // find if user with that course is already created
  const existing = await Completed.findOne({
    user: req.user._id,
    course: courseId,
  }).exec()

  if (existing) {
    // update
    const updated = await Completed.findOneAndUpdate(
      {
        user: req.user._id,
        course: courseId,
      },
      {
        $addToSet: { lessons: lessonId },
      }
    ).exec()
    res.json({ ok: true })
  } else {
    // create
    const created = await new Completed({
      user: req.user._id,
      course: courseId,
      lessons: lessonId,
    }).save()
    res.json({ ok: true })
  }
}

export const listCompleted = async (req, res) => {
  try {
    const list = await Completed.findOne({
      user: req.user._id,
      course: req.body.courseId,
    }).exec()
    list && res.json(list.lessons)
  } catch (err) {
    console.log(err)
  }
}

export const listIncomplete = async (req, res) => {
  try {
    const { courseId, lessonId } = req.body

    const updated = await Completed.findOneAndUpdate(
      {
        user: req.user._id,
        course: courseId,
      },
      {
        $pull: { lessons: lessonId },
      }
    ).exec()
    res.json({ ok: true })
  } catch (err) {
    console.log(err)
  }
}
