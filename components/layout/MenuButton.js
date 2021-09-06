import React, { useEffect } from "react"
import Button from "@material-ui/core/Button"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import { signOut } from "next-auth/client"
import PersonIcon from "@material-ui/icons/Person"
// import Link from "next/link"

import { Link } from "@material-ui/core"
import { useSelector } from "react-redux"
const MenuButton = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const profile = useSelector((state) => state.profile)
  const { loading, error, dbUser } = profile

  // console.log(dbUser)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSignout = (e) => {
    e.preventDefault()
    signOut({ callbackUrl: `${window.location.origin}` })
    // router.push("/user/login")
  }
  useEffect(() => {}, [dbUser])
  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{ color: "white" }}
      >
        <PersonIcon style={{ marginRight: "0.25rem" }} />
        {dbUser.name}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {dbUser && dbUser.role === "instructor" ? (
          <div>
            <Link href="/user/instructor/create">
              <MenuItem onClick={handleClose}>Create Course</MenuItem>
            </Link>
          </div>
        ) : (
          <div>
            <Link href="/user/instructor/new">
              <MenuItem onClick={handleClose}>Become instructor</MenuItem>
            </Link>
          </div>
        )}
        {dbUser.role === "admin" && (
          <div>
            <Link href="/">
              <MenuItem onClick={handleClose}>Rooms</MenuItem>
            </Link>

            <Link href="/">
              <MenuItem onClick={handleClose}>Bookings</MenuItem>
            </Link>
            <Link href="/">
              <MenuItem onClick={handleClose}>Users</MenuItem>
            </Link>
          </div>
        )}

        <Link href="/user/profile">
          <MenuItem onClick={handleClose}>Profile</MenuItem>
        </Link>
        <Link href="/">
          <MenuItem onClick={handleClose}>My Bookings</MenuItem>
        </Link>

        <Link>
          <MenuItem onClick={handleClose} onClick={handleSignout}>
            SignOut
          </MenuItem>
        </Link>
      </Menu>
    </div>
  )
}

export default MenuButton
