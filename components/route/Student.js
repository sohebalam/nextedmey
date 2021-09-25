import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/router"
import { SyncOutlined } from "@ant-design/icons"

const StudentRoute = ({ children, showNav = true }) => {
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
    } catch (err) {
      console.log(err)
      setData(false)
      router.push("/login")
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
        <div className="container-fluid">{children}</div>
      )}
    </>
  )
}

export default StudentRoute
