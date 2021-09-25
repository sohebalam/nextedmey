import { CloudSyncOutlined } from "@ant-design/icons"
import UserRoute from "../../components/route/UserRoute"
import { Grid, Typography } from "@material-ui/core"

const StripeCancel = () => {
  return (
    <UserRoute showNav={false}>
      <Grid container>
        <Grid item xs={9}>
          <CloudSyncOutlined className="display-1 text-danger p-5" />
          <Typography variant="body1">Payment failed. Try again.</Typography>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </UserRoute>
  )
}

export default StripeCancel
