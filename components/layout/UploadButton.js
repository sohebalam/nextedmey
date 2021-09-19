import React from "react"
import { withStyles, makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Avatar from "@material-ui/core/Avatar"
import CircularProgress from "@material-ui/core/CircularProgress"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import Hidden from "@material-ui/core/Hidden"
import PhotoCamera from "@material-ui/icons/PhotoCamera"
import AddToPhotos from "@material-ui/icons/AddToPhotos"
import { InputLabel } from "@material-ui/core"
const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
}))
const UploadButton = () => {
  const classes = useStyles()
  return (
    <>
      <input
        accept="video/*"
        className={classes.input}
        id="icon-button-file"
        multiple
        // onChange={this.handleImageChange}
        type="file"
      />
      <InputLabel htmlFor="icon-button-file">
        <Button
          component="span"
          aria-label="upload"
          fullWidth={true}
          variant="outlined"
          color="primary"
          //   className={classes.button}
        >
          Upload Video
        </Button>
      </InputLabel>
    </>
  )
}
export default UploadButton
