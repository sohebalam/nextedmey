import { useState, useEffect } from "react"
import axios from "axios"
import InstructorRoute from "../../../components/route/Instructor"
import { Avatar, Grid, Tooltip, Typography } from "@material-ui/core"
import Link from "next/link"
import { CheckCircleOutlined } from "@material-ui/icons"
import CancelIcon from "@material-ui/icons/Cancel"
const InstructorIndex = () => {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    loadCourses()
  }, [])

  const loadCourses = async () => {
    const { data } = await axios.get("/api/course/instructor")
    setCourses(data)
  }

  return (
    <InstructorRoute>
      <h1 className="jumbotron text-center square">Instructor Dashboard</h1>
      {courses &&
        courses.map((course) => (
          <Grid container key={course._id}>
            <Grid item xs={3}>
              <Avatar
                style={{ height: "100px", width: "100px" }}
                src={courses.image ? courses.image.Location : "/course.jpg"}
              />
            </Grid>
            <Grid item xs={6}>
              <Link href={`/user/instructor/course/${course.slug}`}>
                <a>
                  <Typography variant="h5">{course.title}</Typography>
                </a>
              </Link>
              <p>{course.lessons.length}</p>
            </Grid>
            <Grid item xs={3}>
              {course.lessons.length < 5 ? (
                <p>At least 5 lessons are required to publish a course</p>
              ) : course.published ? (
                <p>Your course is live in the marketplace</p>
              ) : (
                <p>Your course is ready to be published</p>
              )}

              {course.published ? (
                <Tooltip title="Published">
                  <CheckCircleOutlined className="h5 pointer text-success" />
                </Tooltip>
              ) : (
                <Tooltip title="Unpublished">
                  <CancelIcon className="h5 pointer text-warning" />
                </Tooltip>
              )}
            </Grid>
          </Grid>
        ))}
    </InstructorRoute>
  )
}

export default InstructorIndex
