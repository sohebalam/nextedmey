import { useEffect } from "react"

import axios from "axios"
import { useSelector } from "react-redux"
import { CircularProgress } from "@material-ui/core"

const StripeCallback = () => {
  const profile = useSelector((state) => state.profile)
  const { loading, error, dbUser } = profile

  useEffect(() => {
    if (dbUser) {
      axios.post("/api/stripe/status").then((res) => {
        console.log(res)

        // window.location.href = "/instructor"
      })
    }
  }, [dbUser])

  return <CircularProgress />
}

export default StripeCallback
