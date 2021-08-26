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
import { passwordReset, userRegister } from "../../../redux/actions/userActions"
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

const Reset = () => {
  const [user, setUser] = useState({
    password: "",
  })
  const router = useRouter()
  const dispatch = useDispatch()

  const [password, setPassword] = useState("")
  const [conPassword, setConPassword] = useState("")
  const [userError, setUserError] = useState("")
  const resetPassword = useSelector((state) => state.resetPassword)
  const { loading, error, success, message } = resetPassword

  //   const { name, password, email } = user

  useEffect(() => {
    if (success) {
      // router.push("/user/login")
    }
    if (error) {
      setUserError(error)
      // dispatch(clearErrors())
    }
  }, [dispatch, success, error])

  const { token } = router.query

  const submitHandler = async (e) => {
    e.preventDefault()

    if (password !== conPassword) {
      setUserError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" })
    }

    const userData = {
      password,
      conPassword,
    }
    // console.log(userData, token)
    // return
    dispatch(passwordReset(userData, token))
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
          Reset Password
        </Typography>
        {loading && <CircularProgress />}
        {message && <Alert severity="success">{message}</Alert>}
        {message
          ? ""
          : (error || userError) && (
              <Alert severity="error">{error || userError}</Alert>
            )}
        <form className={classes.form} noValidate onSubmit={submitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="conPassword"
                label="Confirm Password"
                type="password"
                id="conPassword"
                autoComplete="current-password"
                value={conPassword}
                onChange={(e) => setConPassword(e.target.value)}
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
            Reset Password
          </Button>
          <Grid container justifyContent="flex-end">
            {/* <Grid item>
              <Link href="/login" variant="body2">
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

export default Reset
