import { useState } from "react"
import UpdateCourse from "../../../../../components/forms/UpdateCourse"
import Resizer from "react-image-file-resizer"
import axios from "axios"
import { useRouter } from "next/router"
import { List } from "@material-ui/icons"
import {
  ListItemAvatar,
  makeStyles,
  Container,
  CardContent,
  Avatar,
  Grid,
  Box,
  Card,
  Typography,
  ListItem,
} from "@material-ui/core"
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
// import ListItemCard from "../../../../../components/drag/ListItem"
import DragIndicatorIcon from "@material-ui/icons/DragIndicator"
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline"

const useStyles = makeStyles((theme) => ({
  paper: {
    overflowY: "unset",
  },
  customizedButton: {
    position: "absolute",
    left: "95%",
    top: "-9%",
    backgroundColor: "lightgray",
    color: "primary",
  },
  avcolor: {
    backgroundColor: theme.palette.primary.main,
  },
}))

const EditCourse = () => {
  const [values, setValues] = useState({
    title: "",
    description: "",
    price: 0,
    uploading: false,
    paid: true,
    category: "",
    loading: false,
    lessons: [],
  })

  const [image, setImage] = useState("")

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const router = useRouter()

  const { slug } = router.query

  const handleImage = (e) => {
    let file = e.target.files[0]
    setPreview(window.URL.createObjectURL(file))
    setUploadButtonText(file.name)
    setValues({ ...values, loading: true })
    // resize
    Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
      try {
        let { data } = await axios.post("/api/course/image", {
          image: uri,
        })
        console.log("IMAGE UPLOADED", data)
        // set image in the state
        setImage(data)
        setValues({ ...values, loading: false })
      } catch (err) {
        console.log(err)
        setValues({ ...values, loading: false })
        // toast("Image upload failed. Try later.")
      }
    })
  }

  const handleImageRemove = async () => {
    try {
      // console.log(values);
      setValues({ ...values, loading: true })
      const { data } = await axios.post(
        `/api/course/video/remove/${instructorId}`,
        values.video
      )
      setImage({})
      setPreview("")
      setUploadButtonText("Upload Image")
      setValues({ ...values, loading: false })
    } catch (err) {
      console.log(err)
      setValues({ ...values, loading: false })
      // toast("Image upload failed. Try later.")
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(e)
    try {
      console.log(values)
      var strNum = values.price
      strNum = strNum.toString().replace("£", "")

      values.price = parseFloat(strNum)

      const { data } = await axios.put(`/api/course/update/${slug}`, {
        ...values,
        image,
      })
      console.log("here", data)
      // toast("Course updated!")
      // router.push("/instructor");
    } catch (err) {
      // toast(err.response.data)
    }
  }

  const handleDelete = async (index) => {
    const answer = window.confirm("Are you sure you want to delete?")
    if (!answer) return
    let allLessons = values.lessons
    const removed = allLessons.splice(index, 1)
    setValues({ ...values, lessons: allLessons })
    const { data } = await axios.put(`/api/lesson/${slug}/${removed[0]._id}`)
    console.log("lessondeleted", data)
  }

  const onDropzoneArea = (files) =>
    new Promise((resolve, reject) => {
      let reader = new FileReader()
      let file = files[0]

      if (file) {
        reader.readAsDataURL(file)
      }
      reader.onload = function () {
        // console.log(reader.result)
      }
      reader.onerror = (error) => reject(error)

      if (file) {
        setValues({ ...values, loading: true })
        Resizer.imageFileResizer(
          file,
          500,
          300,
          "JPEG",
          100,
          0,
          async (uri) => {
            try {
              let { data } = await axios.post("/api/course/image", {
                image: uri,
              })
              // console.log("IMAGE UPLOADED", data)
              setImage(data)
              // setImage(data)
              setValues({ ...values, loading: false })
            } catch (err) {
              console.log(err)
              setValues({ ...values, loading: false })
              console.log("upload failed. Try later")
            }
          }
        )
      }
    })
  // console.log(values.lessons)

  const handleDrag = (e, index) => {
    // console.log("ON DRAG", index)
    e.dataTransfer.setData("itemIndex", index)
  }

  const handleDrop = async (e, index) => {
    console.log("ON DROP", index)

    const movingItemIndex = e.dataTransfer.getData("itemIndex")
    const targetItemIndex = index
    let allLessons = values.lessons
    let movingItem = allLessons[movingItemIndex]
    allLessons.splice(movingItemIndex, 1)
    allLessons.splice(targetItemIndex, 0, movingItem)

    // let data = {}

    if (data) setValues({ ...values, lessons: [...allLessons] })
    const { data } = await axios.put(`/api/course/${slug}`, {
      ...values,
      image,
    })

    // console.log("Lessons arrange", data)
    // toast("Lessons rearranged")
  }

  const dragOver = async (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }
  const classes = useStyles()

  return (
    <>
      {values && values.lessons && (
        <>
          <div>
            <UpdateCourse
              handleChange={handleChange}
              values={values}
              setValues={setValues}
              handleImage={handleImage}
              handleImageRemove={handleImageRemove}
              handleSubmit={handleSubmit}
              onDropzoneArea={onDropzoneArea}
            />
          </div>
          <div>
            <div style={{ width: 500, margin: "0 auto" }}>
              {values &&
                values?.lessons.map((item, index) => (
                  <div
                    key={item._id}
                    className="draggable"
                    draggable
                    onDragOver={dragOver}
                    onDrop={(e) => handleDrop(e, index)}
                    onDrag={(e) => handleDrag(e, index)}
                    style={{ marginBottom: "0.25rem" }}
                  >
                    <Card>
                      <Grid container>
                        <Grid item xs={1}>
                          <Box padding="1rem">
                            <Avatar className={classes.avcolor}>
                              {index + 1}
                            </Avatar>
                          </Box>
                        </Grid>
                        <Grid item xs={8}>
                          <CardContent>
                            <Typography>{item?.title}</Typography>
                            <span>{item?.content}</span>
                          </CardContent>
                        </Grid>
                        <Grid item xs={2}>
                          <Box
                            padding="1rem"
                            onClick={() => handleDelete(index)}
                          >
                            <DeleteOutlineIcon
                              style={{ marginLeft: "0.5rem" }}
                            />
                            <Typography variant="body1">Delete</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={1}>
                          <Box padding="1rem">
                            <DragIndicatorIcon />
                          </Box>
                        </Grid>
                      </Grid>
                    </Card>
                  </div>
                ))}
            </div>

            {/* </Container> */}
          </div>
        </>
      )}
    </>
  )
}

export default EditCourse
