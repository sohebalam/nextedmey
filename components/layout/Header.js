import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/client"
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import PersonIcon from "@material-ui/icons/Person"
import AssignmentIcon from "@material-ui/icons/Assignment"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import { loadUser, socialReg } from "../../redux/actions/userActions"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import MenuButton from "../layout/MenuButton"
import InstructorMenu from "./InstructorMenu"
// import HowToRegIcon from "@mui/icons-material/HowToReg"
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople"
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

function Header() {
  const [session] = useSession()

  // console.log(session)

  // const handleSignin = (e) => {
  //   e.preventDefault()
  //   signIn()
  // }

  const dispatch = useDispatch()

  const profile = useSelector((state) => state.profile)
  const { loading, error, dbUser } = profile

  // console.log("headerd", dbUser)

  useEffect(() => {
    if (session) {
      const { user } = session
      // console.log(user)

      const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        password: null,
      }
      // console.log(dbUser)
      if (!dbUser) {
        if (user.id) {
          dispatch(socialReg(userData))
          // console.log(userData)
        }
      }
    }
    if (!dbUser) {
      if (session) {
        dispatch(loadUser())
      }
    }
  }, [session])

  const classes = useStyles()

  return (
    <div>
      <div component="nav">
        <AppBar position="static" style={{ color: "primary" }}>
          <Toolbar>
            {/* <IconButton
              color="inherit"
              aria-label="open drawer"
              // onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton> */}
            <IconButton aria-label="menu">
              <Link href="/">
                {<img src="/v3.png" height="40px" alt="logo" />}
              </Link>
            </IconButton>

            <Typography variant="h6" className={classes.title}></Typography>

            <>
              {/* {dbUser && dbUser.role && dbUser.role.includes("instructor") ? (
                <InstructorMenu dbUser={dbUser} /> ? (
                  dbUser
                ) : (
                  <>
                    <Link href="/user/instructor/new">
                      <Button style={{ color: "white" }}>
                        <EmojiPeopleIcon style={{ marginRight: "0.3rem" }} />
                        Become Instructor
                      </Button>
                    </Link>
                  </>
                )
              ) : (
                []
              )} */}

              {dbUser && dbUser.role && dbUser.role.includes("instructor") ? (
                <InstructorMenu dbUser={dbUser} />
              ) : (
                dbUser && (
                  <Link href="/user/instructor/new">
                    <Button style={{ color: "white" }}>
                      <EmojiPeopleIcon style={{ marginRight: "0.3rem" }} />
                      Become Instructor
                    </Button>
                  </Link>
                )
              )}

              {dbUser ? (
                <>
                  <div>
                    {/* <Link href="/user/instructor/create"> */}
                    {/* <Button style={{ color: "white" }}> */}

                    {/* </Button> */}
                    {/* </Link> */}
                  </div>

                  <MenuButton dbUser={dbUser} />
                </>
              ) : (
                <>
                  <Link href="/user/register">
                    <Button color="inherit">
                      <AssignmentIcon style={{ marginRight: "0.25rem" }} />
                      Register
                    </Button>
                  </Link>
                  <Link href="/user/login">
                    <Button color="inherit">
                      <PersonIcon style={{ marginRight: "0.25rem" }} />
                      Login
                    </Button>
                  </Link>
                </>
              )}
            </>
          </Toolbar>
        </AppBar>
      </div>
    </div>
  )
}

export default Header
