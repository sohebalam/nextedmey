import { getSession } from "next-auth/client"
import InstructorRoute from "../../../components/route/Instructor"
const Createcourse = () => {
  return (
    <InstructorRoute>
      <h1>Createcourse </h1>
    </InstructorRoute>
  )
}

export default Createcourse
