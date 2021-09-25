import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import { Avatar, Box, ListItem, makeStyles } from "@material-ui/core"
import { Button, Menu } from "antd"
import StudentRoute from "../../../components/route/Student"
import { List } from "@material-ui/core"
const useStyles = makeStyles((theme) => ({
  avcolor: {
    backgroundColor: theme.palette.primary.main,
  },
}))
const SingleCourse = () => {
  const [loading, setLoading] = useState(false)
  const [course, setCourse] = useState({ lessons: [] })
  const [clicked, setClicked] = useState(-1)
  const [collapsed, setCollapsed] = useState(false)

  // router
  const router = useRouter()
  const { slug } = router.query

  useEffect(() => {
    if (slug) loadCourse()
  }, [slug])

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/user/course/${slug}`)
    setCourse(data)
    console.log(course)
  }
  const classes = useStyles()
  return (
    <>
      <StudentRoute>
        <div className="row">
          <div style={{ maWidth: 320 }}>
            <List defaultValue={[clicked]} className="pointer">
              {course.lessons.map((lesson, index) => (
                <ListItem onClick={() => setClicked(index)} key={index}>
                  <Box mr="1rem">
                    <Avatar className={classes.avcolor}>{index + 1}</Avatar>
                  </Box>

                  {lesson.title.substring(0, 30)}
                </ListItem>
              ))}
            </List>
          </div>

          <div className="col">
            {clicked !== -1 ? (
              <>{JSON.stringify(course.lessons[clicked])}</>
            ) : (
              <>Clcik on the lesson to start learning</>
            )}
          </div>
        </div>
      </StudentRoute>
      {/* <h1>{JSON.stringify(course, null, 4)}</h1> */}
    </>
  )
}

export default SingleCourse
