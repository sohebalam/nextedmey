import { useState, useEffect } from "react"
import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import Hero from "../components/layout/Hero"
import axios from "axios"
import CourseCard from "../components/cards/CourseCard"
import { Grid, Paper } from "@material-ui/core"
import { Box } from "@mui/system"

const Home = ({ courses }) => {
  // const [courses, setCourses] = useState([])

  // console.log(courses)

  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     const { data } = await axios.get(`/api/course/publish/all`)
  //     setCourses(data)
  //   }
  //   fetchCourses()
  // }, [])

  return (
    <div>
      {/* <Box mb="3rem"> */}
      <Paper>
        <Hero
          imgSrc="/home-hero.jpg"
          imgAlt="satified woman eating in restaurant"
          title="OpenFreeUni"
          subtitle="Learn for Free!"
        />
      </Paper>
      {/* </Box> */}
      <Grid container>
        {courses.map((course) => (
          <Grid item key={course._id} xs={4}>
            <Box padding="0.5rem">
              <CourseCard course={course} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.API}/api/course/publish/all`)

  return {
    props: { courses: data },
  }
}

export default Home
