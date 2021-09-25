import { useState, useEffect } from "react"
import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import Hero from "../components/layout/Hero"
import axios from "axios"
import CourseCard from "../components/cards/CourseCard"

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
      <Hero
        imgSrc="/home-hero.jpg"
        imgAlt="satified woman eating in restaurant"
        title="OpenFreeUni"
        subtitle="Learn for Free!"
      />
      {courses.map((course) => (
        <div key={course._id} className="col-md-4">
          <CourseCard course={course} />
        </div>
      ))}
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
