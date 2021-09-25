import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import InstructorRoute from "../../../../components/route/Instructor"
import axios from "axios"
import {
  Avatar,
  Tooltip,
  Button,
  Modal,
  List,
  Grid,
  Box,
  DialogContent,
  makeStyles,
  DialogActions,
  IconButton,
  ListItemAvatar,
  Snackbar,
  Alert,
} from "@material-ui/core"
// import { CheckOutlined, UploadOutlined } from "@ant-design/icons"
import Item from "@material-ui/icons"
import ReactMarkdown from "react-markdown"
import { Typography } from "antd"
import { CheckCircleOutline } from "@material-ui/icons"
import EditIcon from "@material-ui/icons/Edit"
import HighlightOffIcon from "@material-ui/icons/HighlightOff"
import HelpOutlineIcon from "@material-ui/icons/HelpOutline"
import PublishIcon from "@material-ui/icons/Publish"
import Dialog from "@material-ui/core/Dialog"
import AddLesson from "../../../../components/forms/AddLesson"
import CloseIcon from "@material-ui/icons/Close"
import ListItem from "@material-ui/core/ListItem"

const useStyles = makeStyles((theme) => ({
  paper: {
    overflowY: "unset",
  },
  customizedButton: {
    position: "absolute",
    left: "95%",
    top: "-9%",
    backgroundColor: "lightgray",
    color: "primary",
  },
  avcolor: {
    backgroundColor: theme.palette.primary.main,
  },
}))

const CourseView = () => {
  const [course, setCourse] = useState({})
  const [visible, setVisible] = useState(false)
  const [values, setValues] = useState({
    title: "",
    content: "",
    video: "",
  })
  const classes = useStyles()
  const [uploading, setUploading] = useState(false)
  const [uploadButtonText, setUploadButtonText] = useState("Upload Video")
  const [progress, setProgress] = useState(0)

  const router = useRouter()
  const { slug } = router.query

  // console.log(slug)

  useEffect(() => {
    loadCourse()
  }, [slug])
  const loadCourse = async () => {
    const { data } = await axios.get(`/api/course/${slug}`)
    setCourse(data)
  }

  const handleAddLesson = async (e) => {
    e.preventDefault()
    setUploading(true)
    let instructorId = course.instructor._id
    try {
      const { data } = await axios.post(
        `/api/course/${slug}/${instructorId}`,
        values
      )
      setUploading(false)
      setValues({ ...values, title: "", content: "", video: {} })
      setProgress(0)
      setUploadButtonText("Upload video")
      setVisible(false)
      setCourse(data)
      // toast("Lesson added")
    } catch (error) {
      console.log(error)
      // toast("Lesson add failed")
    }
  }

  const handelVideo = async (e) => {
    // const file = e.target.files[0]
    // setUploadButtonText(file.name)

    try {
      const file = e.target.files[0]
      setUploadButtonText(file.name)
      setUploading(true)
      const formData = new FormData()
      formData.append("video", file)

      let instructorId = course.instructor._id

      const { data } = await axios.post(
        `/api/course/video/${instructorId}`,
        formData,
        {
          onUploadProgress: (e) =>
            setProgress(Math.round((100 * e.loaded) / e.total)),
        }
      )

      // console.log(data)
      setValues({ ...values, video: data })
      setUploading(false)
      // toast("Video Upload Success")
    } catch (error) {
      console.log(error)
      setUploading(false)
      // toast("Video Upload Failed")
    }
  }

  const handelVideoRemove = async () => {
    try {
      setUploading(true)

      let instructorId = course.instructor._id
      // console.log(values)
      let video = values.video
      console.log(video)

      const { data } = await axios.post(
        `/api/course/video/remove/${instructorId}`,
        values.video
      )
      console.log(data)
      setValues({ ...values, video: {} })
      setUploading(false)
      setUploadButtonText("Upload Video")
    } catch (err) {
      console.log(err)
      setUploading(false)
      // toast("Video remove failed")
    }
  }

  const handlePublish = async (e, courseId) => {
    try {
      let answer = window.confirm(
        "One you publish your course, it will be live in the marketplace for users to enroll"
      )
      if (!answer) return

      const { data } = await axios.put(`/api/course/publish/${courseId}`)
      // toast(" course is live")
      console.log(" course is live")

      setCourse(data)
    } catch (error) {
      // toast("Publish failed, course is not live")
    }
  }

  const handleUnpublish = async (e, courseId) => {
    try {
      let answer = window.confirm(
        "One you Un-Publish your course, it will  not be live in the marketplace for users to enroll"
      )
      if (!answer) return
      const { data } = await axios.put(`/api/course/unpublish/${courseId}`)
      // toast(" course is not live")
      console.log(" course is not live")
      setCourse(data)
    } catch (error) {
      // toast("UnPublish failed, course is live")
    }
  }

  return (
    <InstructorRoute>
      <>
        {/* <pre>{JSON.stringify(course, null, 4)}</pre> */}
        {course && (
          <Grid container key={course._id} style={{ marginTop: "2rem" }}>
            <Grid container>
              <Grid item xs={2}>
                <Avatar
                  style={{ height: "100px", width: "100px" }}
                  src={course.image ? course.image.Location : "/course.jpg"}
                />
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h5">{course.title}</Typography>
                <Typography variant="subtitle1">
                  {course.lessons && course.lessons.length} Lessons
                </Typography>
                <Typography variant="subtitle2">{course.category}</Typography>
              </Grid>
              <Grid item xs={2}>
                <div>
                  <Tooltip title="Edit">
                    <EditIcon
                      onClick={() =>
                        router.push(`/user/instructor/course/edit/${slug}`)
                      }
                      className="h5 pointer text-warning mr-4"
                    />
                  </Tooltip>
                  {course.lessons && course.lessons.length < 5 ? (
                    <Tooltip title="Min 5 lessons required to publish">
                      <HelpOutlineIcon className="h5 pointer text-danger" />
                    </Tooltip>
                  ) : course.published ? (
                    <Tooltip title="Unpublish">
                      <HighlightOffIcon
                        onClick={handlePublish}
                        onClick={(e) => handleUnpublish(e, course._id)}
                        className="h5 pointer text-danger"
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip title="Publish">
                      <CheckCircleOutline
                        onClick={(e) => handlePublish(e, course._id)}
                        className="h5 pointer text-success"
                      />
                    </Tooltip>
                  )}
                </div>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={3}>
                <Box mt="1rem">
                  <Button
                    variant="outlined"
                    fullWidth={true}
                    color="primary"
                    icon={<PublishIcon />}
                    size="large"
                    onClick={() => setVisible(true)}
                  >
                    Add Lesson
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={8}>
                <Box padding="1rem">
                  <ReactMarkdown>{course.description}</ReactMarkdown>
                </Box>
              </Grid>
              <Grid item xs={1}></Grid>
            </Grid>
          </Grid>
        )}

        <Dialog
          open={visible}
          onClose={() => setVisible(false)}
          footer={null}
          classes={{ paper: classes.paper }}
        >
          <AddLesson
            values={values}
            setValues={setValues}
            handleAddLesson={handleAddLesson}
            uploading={uploading}
            uploadButtonText={uploadButtonText}
            handelVideo={handelVideo}
            progress={progress}
            handelVideoRemove={handelVideoRemove}
          />
          <DialogActions>
            <IconButton
              autoFocus
              onClick={() => setVisible(false)}
              color="primary"
              className={classes.customizedButton}
            >
              <CloseIcon />
            </IconButton>
          </DialogActions>
        </Dialog>
      </>
      <div>
        <h4>{course && course.lessons && course.lessons.length} Lessons</h4>
        {course &&
          course.lessons?.map((lesson, index) => (
            <List key={lesson._id}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar className={classes.avcolor}>{index + 1}</Avatar>
                </ListItemAvatar>
                {lesson.title}
              </ListItem>
            </List>
          ))}
      </div>
    </InstructorRoute>
  )
}

export default CourseView
