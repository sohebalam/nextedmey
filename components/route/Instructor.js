import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/router"
import { CircularProgress } from "@material-ui/core"
import { useSelector, useDispatch } from "react-redux"
import { loadUser } from "../../redux/actions/userActions"
import { useSession } from "next-auth/client"

const InstructorRoute = ({ children }) => {
  const [session] = useSession()
  const profile = useSelector((state) => state.profile)
  const { loading, error, dbUser } = profile

  console.log(dbUser)

  const dispatch = useDispatch()
  // state
  const [ok, setOk] = useState(false)
  // router
  const router = useRouter()

  // console.log(session?.user.role)

  useEffect(() => {
    if (!dbUser) {
      if (session) {
        dispatch(loadUser())
      }
    }

    if (dbUser && dbUser.role && !dbUser.role.includes("instructor")) {
      router.push("/")
    }
  }, [dbUser])

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">{/* <InstructorNav /> */}</div>
            <div className="col-md-10">{children}</div>
          </div>
        </div>
      )}
    </>
  )
}

export default InstructorRoute
