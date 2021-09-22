import { useState, useEffect } from "react"
import axios from "axios"
import { currencyFormatter } from "../../utils/currency"
import { Badge } from "antd"
import ReactPlayer from "react-player"
import { LoadingOutlined, SafetyOutlined } from "@ant-design/icons"
import {
  Grid,
  Box,
  Typography,
  makeStyles,
  Paper,
  Button,
} from "@material-ui/core"
import Image from "next/image"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background:
      "linear-gradient(90deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    background: "inherit",
  },
}))

const SingleCourseJumbotron = ({
  course,
  showModal,
  setShowModal,
  setPreview,
  preview,
  loading,
  user,
  handelPaidEnroll,
  handelFreeEnroll,
  enrolled,
  setEnrolled,
}) => {
  const {
    title,
    description,
    instructor,
    updatedAt,
    lessons,
    image,
    price,
    paid,
    category,
  } = course

  const classes = useStyles()
  return (
    <Paper className={classes.root}>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        style={{ backgroundColor: "secondary" }}
      >
        <Typography
          component="p"
          variant="h3"
          align="center"
          color="primary"
          sx={{
            mb: 10,
          }}
        >
          {/* {subtitle} */}
        </Typography>
        <div>
          <Grid container>
            <Grid item xs={8}>
              <Typography
                variant="h1"
                align="center"
                gutterBottom
                sx={{
                  color: "secondary.main",
                  fontWeight: 400,
                }}
              >
                {title}
              </Typography>
              <Box padding="1rem">
                <Typography variant="body1">
                  {description && description.substring(0, 160)}...
                </Typography>
                <Badge
                  count={category}
                  style={{ backgroundColor: "#03a9f4" }}
                  className="pb-4 mr-2"
                />
                <Typography variant="body1">
                  Created by {instructor.name}
                </Typography>
                <Typography variant="body1">
                  Last updated {new Date(updatedAt).toLocaleString()}
                </Typography>
                <Typography variant="h4">
                  {paid
                    ? currencyFormatter({ amount: price, currency: "gbp" })
                    : "Free"}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              {lessons[0].video && lessons[0].video.Location ? (
                <div
                  onClick={() => {
                    setPreview(lessons[0].video.Location)
                    setShowModal(!showModal)
                  }}
                >
                  <ReactPlayer
                    className="react-player-div"
                    url={lessons[0].video.Location}
                    light={image.Location}
                    width="100%"
                    height="225px"
                  />
                </div>
              ) : (
                <div>
                  <Image
                    src={image.Location || "/course.jpg"}
                    alt={title}
                    height={200}
                    width={400}
                  />
                </div>
              )}
              {loading ? (
                <div className="d-flex justify-contect-center">
                  <LoadingOutlined className="h1 text-danger" />
                </div>
              ) : (
                <Button
                  className="mb-3 mt-2"
                  type="danger"
                  block
                  shape="round"
                  size="large"
                  disabled={loading}
                  onClick={paid ? handelPaidEnroll : handelFreeEnroll}
                >
                  <CheckCircleOutlineIcon />
                  {user
                    ? enrolled.status
                      ? "Go to course"
                      : "Enroll"
                    : "Login to Enroll"}
                </Button>
              )}
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Paper>
  )
}

export default SingleCourseJumbotron
