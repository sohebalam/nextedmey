import { useState, useEffect } from "react"

import Link from "next/link"
import { Box, CircularProgress, Input } from "@material-ui/core"
import MenuBookIcon from "@material-ui/icons/MenuBook"
import { InputLabel } from "@material-ui/core"
import { DropzoneArea } from "material-ui-dropzone"
import { Avatar, FormControl, Select, TextField } from "@material-ui/core"
import { CssBaseline } from "@material-ui/core"
import { Typography } from "@material-ui/core"
import { FormControlLabel } from "@material-ui/core"
import { Grid } from "@material-ui/core"
import { Checkbox } from "@material-ui/core"
import { makeStyles } from "@material-ui/core"
import { Button } from "@material-ui/core"
import { Container } from "@material-ui/core"
import Image from "next/image"
import ImageIcon from "@material-ui/icons/Image"
import axios from "axios"
import { useRouter } from "next/router"

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    backgroundColor: theme.palette.secondary.main,
  },
}))

const UpdateCourse = ({
  handleSubmit,
  handleChange,
  onDropzoneArea,
  handleImageRemove,
  setValues,
  values,
}) => {
  const children = []
  for (let i = 9.99; i <= 100.99; i++) {
    children.push(<option key={i.toFixed(2)}>£{i.toFixed(2)}</option>)
  }

  // const [image, setImage] = useState({})
  const [etag, setEtag] = useState({})
  const [preview, setPreview] = useState("")
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image")
  const [urlimage, setUrlimage] = useState()
  const router = useRouter()
  const { slug } = router.query

  // console.log(slug)

  const classes = useStyles()

  useEffect(() => {
    loadCourse()
  }, [])

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/course/${slug}`)

    if (data.image.Location) {
      var url = data.image.Location
      setUrlimage(url)
    }
    setValues(data)
    // console.log("price", values.price)
  }

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <MenuBookIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Update Course
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            // label="Course Title"
            name="title"
            autoFocus
            value={values?.title || ""}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="category"
            // label="Category"
            name="category"
            autoFocus
            value={values?.category || ""}
            onChange={handleChange}
          />

          <TextField
            multiline
            minRows={2}
            maxRows={5}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="description"
            // label="Description"
            type="text"
            id="description"
            value={values?.description || ""}
            onChange={handleChange}
          />
          <Grid container>
            <Box padding="1.3rem">
              {values?.price && (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values?.paid || false}
                      color="primary"
                      onChange={(e) =>
                        setValues({ ...values, paid: e.target.checked })
                      }
                      // onChange={(e) => console.log(e.target.checked)}
                    />
                  }
                  label="Paid"
                />
              )}
            </Box>

            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Price
              </InputLabel>

              <Select
                native
                onChange={(e) =>
                  setValues({ ...values, price: e.target.value })
                }
              >
                {children}
              </Select>
            </FormControl>
          </Grid>

          <Box mt="2rem">
            <Grid container>
              {urlimage && (
                <DropzoneArea
                  initialFiles={[urlimage]}
                  acceptedFiles={["image/*"]}
                  filesLimit={3}
                  maxFileSize={1048576} //1 MB
                  showFileNames={true}
                  dropzoneText={"Drag and drop an image here or click"}
                  onChange={onDropzoneArea}
                  onDelete={handleImageRemove}
                />
              )}
            </Grid>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {values.loading ? "Updating..." : "Update & Continue"}
          </Button>
          {values.loading && <CircularProgress />}
          <Grid container>
            <Grid item xs>
              {/* <Link href="#" variant="body2">
              Forgot password?
            </Link> */}
            </Grid>
            <Grid item>
              {/* <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link> */}
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

export default UpdateCourse
