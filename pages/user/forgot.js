import React, { useState, useEffect } from "react"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Link from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
import { clearErrors, passwordForgot } from "../../redux/actions/userActions"
import { CircularProgress } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { getSession } from "next-auth/client"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const Forgot = () => {
  const [user, setUser] = useState({
    email: "",
  })
  const router = useRouter()
  const dispatch = useDispatch()
  const [userError, setUserError] = useState("")
  const [email, setEmail] = useState("")

  const forgotPassword = useSelector((state) => state.forgotPassword)
  const { loading, error, success, message } = forgotPassword

  //   const { name, password, email } = user

  useEffect(() => {
    if (success) {
      router.push("/user/reset")
    }
    if (error) {
      setUserError(error)
      dispatch(clearErrors())
    }
  }, [dispatch, success, error])

  const submitHandler = async (e) => {
    e.preventDefault()
    const userData = {
      email,
    }
    // console.log(userData)
    // return
    dispatch(passwordForgot(userData))
  }

  const classes = useStyles()

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
        {loading && <CircularProgress />}
        {message && <Alert severity="success">{message}</Alert>}
        <form className={classes.form} noValidate onSubmit={submitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Email Reset
          </Button>
          <Grid container justifyContent="flex-end">
            {/* <Grid item>
              <Link href="/user/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid> */}
          </Grid>
        </form>
      </div>
    </Container>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

export default Forgot
