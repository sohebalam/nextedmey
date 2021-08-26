import React from "react"
import Button from "@material-ui/core/Button"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import { signOut } from "next-auth/client"
import PersonIcon from "@material-ui/icons/Person"
// import Link from "next/link"

import { Link } from "@material-ui/core"
const MenuButton = ({ dbUser }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)

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

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        // style={{ color: "white" }}
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
        {dbUser.role === "admin" && (
          <div>
            <Link href="/badmin/allrooms">
              <MenuItem onClick={handleClose}>Rooms</MenuItem>
            </Link>

            <Link href="/badmin/bookings/bookings">
              <MenuItem onClick={handleClose}>Bookings</MenuItem>
            </Link>
            <Link href="/badmin/allusers">
              <MenuItem onClick={handleClose}>Users</MenuItem>
            </Link>
          </div>
        )}

        <Link href="/user/profile">
          <MenuItem onClick={handleClose}>Profile</MenuItem>
        </Link>
        <Link href="/bookings/myBookings">
          <MenuItem onClick={handleClose}>My Bookings</MenuItem>
        </Link>
        {/* <Link href="/orderslist" underline="none">
          <MenuItem onClick={handleClose}>Orders</MenuItem>
        </Link> */}

        <MenuItem onClick={handleClose} onClick={handleSignout}>
          SignOut
        </MenuItem>
      </Menu>
    </div>
  )
}

export default MenuButton
