import { Grid } from "@material-ui/core"
import { Button } from "@material-ui/core"

const UserNav = () => {
  return (
    <>
      <Grid container>
        <Grid item sm={6}>
          <Button variant="contained" color="primary" fullWidth>
            Profile
          </Button>
        </Grid>

        <Grid item sm={6}></Grid>
      </Grid>
    </>
  )
}

export default UserNav
