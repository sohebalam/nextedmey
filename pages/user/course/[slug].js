import React, { useState, useEffect } from "react"
import { styled, useTheme } from "@mui/material/styles"
import Box from "@mui/material/Box"
import MuiDrawer from "@mui/material/Drawer"
import MuiAppBar from "@mui/material/AppBar"
import List from "@mui/material/List"
import CssBaseline from "@mui/material/CssBaseline"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import { makeStyles, Avatar } from "@material-ui/core"
import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import InboxIcon from "@mui/icons-material/MoveToInbox"
import MailIcon from "@mui/icons-material/Mail"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"
import { useRouter } from "next/router"
import axios from "axios"
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline"
import StudentRoute from "../../../components/route/Student"
import ReactPlayer from "react-player"
import ReactMarkdown from "react-markdown"
import { Alert, Grid } from "@mui/material"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"
const useStyles = makeStyles((theme) => ({
  avcolor: {
    backgroundColor: theme.palette.primary.main,
  },

  root: {
    width: "100%",
    maxWidth: 360,
  },
  danger: {
    color: "red",
  },
  success: {
    color: "#32CD32",
  },
}))

const drawerWidth = 300

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 3px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 3px)`,
  },
})

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}))

export default function MiniDrawer() {
  const theme = useTheme()
  const [open, setOpen] = useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const [loading, setLoading] = useState(false)
  const [course, setCourse] = useState({ lessons: [] })
  const [clicked, setClicked] = useState(-1)
  const [completedLessons, setCompletedLessons] = useState([])
  const [updateState, setUpdateState] = useState(false)
  // router
  const router = useRouter()
  const { slug } = router.query

  useEffect(() => {
    if (slug) loadCourse()
  }, [slug])

  useEffect(() => {
    if (course) loadCompletedLessons()
  }, [course])

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/user/course/${slug}`)
    setCourse(data)
    // console.log(course)
  }
  const classes = useStyles()

  const loadCompletedLessons = async () => {
    const { data } = await axios.post(`/api/complete/list`, {
      courseId: course._id,
    })
    setCompletedLessons(data)
    console.log(completedLessons)
  }

  const markCompleted = async () => {
    const { data } = await axios.post(`/api/complete/mark`, {
      courseId: course._id,
      lessonId: course.lessons[clicked]._id,
    })
    console.log(data)
    setCompletedLessons([...completedLessons, course.lessons[clicked]._id])
  }

  const markIncompleted = async () => {
    try {
      const { data } = await axios.post(`/api/complete/unmark`, {
        courseId: course._id,
        lessonId: course.lessons[clicked]._id,
      })
      console.log(data)
      const all = completedLessons
      console.log("ALL => ", all)
      const index = all.indexOf(course.lessons[clicked]._id)
      if (index > -1) {
        all.splice(index, 1)
        console.log("ALL WITHOUT REMOVED => ", all)
        setCompletedLessons(all)
        setUpdateState(!updateState)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <StudentRoute>
      <Box>
        <CssBaseline />

        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <Box>
              {open && (
                <IconButton
                  onClick={handleDrawerClose}
                  color="inherit"
                  aria-label="open drawer"
                >
                  <KeyboardArrowLeftIcon />
                </IconButton>
              )}

              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 1, ...(open && { display: "none" }) }}
              >
                <KeyboardArrowRightIcon />
              </IconButton>
            </Box>
          </DrawerHeader>

          <Divider />
          <Typography variant="body1" padding="0.5rem">
            Lessons
          </Typography>
          <List defaultValue={[clicked]} className="pointer">
            {course.lessons.map((lesson, index) => (
              <ListItem onClick={() => setClicked(index)} key={index}>
                <Box mr="1rem">
                  <Avatar className={classes.avcolor}>{index + 1}</Avatar>
                </Box>

                {completedLessons && completedLessons.includes(lesson._id) ? (
                  <>
                    <CheckCircleOutlineIcon
                      className={classes.success}
                      style={{ marginRight: "0.5rem" }}
                    />
                  </>
                ) : (
                  <>
                    <HighlightOffIcon
                      className={classes.danger}
                      style={{ marginRight: "0.5rem" }}
                    />
                  </>
                )}
                {lesson.title.substring(0, 30)}
                <PlayCircleOutlineIcon style={{ marginLeft: "0.5rem" }} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
        <Box sx={{ flexGrow: 1, p: 1 }}>
          {/* <DrawerHeader /> */}
          {clicked !== -1 ? (
            <>
              {course.lessons[clicked].video &&
                course.lessons[clicked].video.Location && (
                  <>
                    <div className="wrapper">
                      <Grid container padding="1rem">
                        <Grid item xs={10}>
                          <b>
                            {course.lessons[clicked].title.substring(0, 30)}
                          </b>
                        </Grid>
                        <Grid item xs={2}>
                          {completedLessons &&
                          completedLessons.includes(
                            course.lessons[clicked]._id
                          ) ? (
                            <span
                              className="float-right pointer"
                              onClick={markIncompleted}
                            >
                              Mark as incomplete
                              <DoNotDisturbAltIcon
                                style={{ marginLeft: "0.5rem" }}
                              />
                            </span>
                          ) : (
                            <span
                              className="float-right pointer"
                              onClick={markCompleted}
                            >
                              Mark as completed
                              <CheckCircleOutlineIcon
                                style={{ marginLeft: "0.5rem" }}
                              />
                            </span>
                          )}
                        </Grid>
                      </Grid>

                      <Box>
                        <ReactPlayer
                          className="player"
                          url={course.lessons[clicked].video.Location}
                          width="100%"
                          height="100%"
                          controls
                          onEnded={() => markCompleted()}
                        />
                      </Box>
                    </div>
                  </>
                )}
              <ReactMarkdown>{course.lessons[clicked].content}</ReactMarkdown>
            </>
          ) : (
            <>Click on the lesson to start learning</>
          )}
        </Box>
      </Box>
    </StudentRoute>
  )
}
