import { useEffect } from "react"

import axios from "axios"
import { useSelector } from "react-redux"
import { CircularProgress } from "@material-ui/core"
import { useRouter } from "next/router"

const StripeCallback = () => {
  const router = useRouter()
  const profile = useSelector((state) => state.profile)
  const { loading, error, dbUser } = profile

  useEffect(() => {
    if (dbUser) {
      axios.post("/api/stripe/status").then((res) => {
        console.log(res)

        router.push("/user/instructor/dashboard")
      })
    }
  }, [dbUser])

  // useEffect(() => {
  //   if (dbUser) {
  //     axios.post("/api/instructor/getAccountStatus").then((res) => {
  //       // console.log(res);
  //       // dispatch({
  //       //   type: "LOGIN",
  //       //   payload: res.data,
  //       // })
  //       window.localStorage.setItem("user", JSON.stringify(res.data))
  //       window.location.href = "/instructor"
  //     })
  //   }
  // }, [dbUser])

  return <CircularProgress />
}

export default StripeCallback
