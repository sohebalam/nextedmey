import { useEffect, useState } from "react"
import axios from "axios"
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core"
import { useSelector, useDispatch } from "react-redux"
import { Container } from "@material-ui/core"
import { regInstructor } from "../../../redux/actions/userActions"
import { useRouter } from "next/router"

const New = () => {
  const dispatch = useDispatch()
  const profile = useSelector((state) => state.profile)
  const { loading, error, dbUser } = profile
  const router = useRouter()

  const newInstructor = useSelector((state) => state.newInstructor)
  const {
    loading: instructorLoading,
    error: instructorError,
    link,
  } = newInstructor

  useEffect(() => {
    if (link) {
      // window.location.href = link
      router.push(link)
    } else {
      instructorError
    }
  }, [link])

  const BecomeInstructor = async (e) => {
    e.preventDefault()

    console.log("Become Instructor")
    dispatch(regInstructor())
  }

  return (
    <>
      <h1>New </h1>

      {instructorLoading ? (
        <CircularProgress />
      ) : (
        <Container component="main">
          <Box mt="1rem">
            <Typography>
              Register with Stripe to receive payments from students
            </Typography>
          </Box>
          <Box mt="1rem">
            <Button
              onClick={BecomeInstructor}
              variant="contained"
              color="secondary"
              // disabled={(dbUser && (dbUser.role = "instructor")) || loading}
            >
              Register for Stripe
            </Button>
          </Box>
        </Container>
      )}
    </>
  )
}

export default New
