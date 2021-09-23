import { useEffect } from "react"
import { SyncOutlined } from "@ant-design/icons"
import UserRoute from "../../../components/route/UserRoute"
import { useRouter } from "next/router"
import axios from "axios"
import { Grid } from "@material-ui/core"

const StripeSuccess = () => {
  // router
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (id) successRequest()
  }, [id])

  console.log(id)

  const successRequest = async () => {
    const { data } = await axios.get(`/api/stripe/${id}`)
    // console.log("SUCCESS REQ DATA", data);
    router.push(`/user/course/${data.course.slug}`)
  }

  return (
    <UserRoute showNav={false}>
      <Grid>
        <Grid item xs={9} mb="5">
          <div className="d-flex justify-content-center p-5">
            <SyncOutlined spin className="display-1 text-danger p-5" />
          </div>
        </Grid>
        <Grid item xs={3} padding="5"></Grid>
      </Grid>
    </UserRoute>
  )
}

export default StripeSuccess
