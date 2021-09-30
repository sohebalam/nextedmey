import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/router"
import { SyncOutlined } from "@ant-design/icons"
import UserNav from "../layout/UserNav"
// import UserNav from "../nav/UserNav"

const UserRoute = ({ children, showNav = true }) => {
  // state
  const [data, setData] = useState(false)
  // router
  const router = useRouter()

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/auth/profile")
      //   console.log(data);
      if (data) setData(true)
      console.log(data)
    } catch (err) {
      console.log(err)
      setData(false)
      router.push("/user/login")
    }
  }

  return (
    <>
      {!data ? (
        <SyncOutlined
          spin
          className="d-flex justify-content-center display-1 text-primary p-5"
        />
      ) : (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">{showNav && <UserNav />}</div>
            <div className="col-md-10">{children}</div>
          </div>
        </div>
      )}
    </>
  )
}

export default UserRoute
