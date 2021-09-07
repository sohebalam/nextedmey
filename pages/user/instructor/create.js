import { useState } from "react"
import axios from "axios"
import InstructorRoute from "../../../components/route/Instructor"
import CourseCreateForm from "../../../components/forms/CourseCreate"
import Resizer from "react-image-file-resizer"
// import { toast } from "react-toastify"
import { useRouter } from "next/router"
import { CircularProgress } from "@material-ui/core"
// import user from "../../../../server/models/user"

const CourseCreate = () => {
  // state
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "9.99",
    uploading: false,
    paid: true,
    category: "",
    loading: false,
  })
  // const [image, setImage] = useState({})
  const [etag, setEtag] = useState({})
  const [preview, setPreview] = useState("")
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image")

  // router
  const router = useRouter()

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onDropzoneAreaChange = (files) =>
    new Promise((resolve, reject) => {
      let reader = new FileReader()
      let file = files[0]

      if (file) {
        reader.readAsDataURL(file)
      }
      reader.onload = function () {
        console.log(reader.result)
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
              console.log("IMAGE UPLOADED", data)
              setEtag(data)
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

  const handleImageRemove = async () => {
    // console.log("image remove", etag.Bucket)

    // window.confirm("Are you sure you want to delete")
    try {
      console.log("etag", etag)
      setValues({ ...values, loading: true })
      const res = await axios.post("/api/course/delete", { etag })
      setEtag({})
      setPreview("")
      setUploadButtonText("Upload Image")
      setValues({ ...values, loading: false })
    } catch (err) {
      console.log(err)
      setValues({ ...values, loading: false })
      console.log("upload failed. Try later")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // console.log(values);
      const { data } = await axios.post("/api/course", {
        ...values,
        image,
      })
      console.log("Great! Now you can start adding lessons")
      router.push("/instructor")
    } catch (err) {
      console.log(err.response.data)
    }
  }

  return (
    <InstructorRoute>
      <h1 className="jumbotron text-center square">Create Course</h1>
      {values.loading && <CircularProgress />}
      <div className="pt-3 pb-3">
        <CourseCreateForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          values={values}
          setValues={setValues}
          preview={preview}
          uploadButtonText={uploadButtonText}
          handleImageRemove={handleImageRemove}
          onDropzoneAreaChange={onDropzoneAreaChange}
        />
      </div>
    </InstructorRoute>
  )
}

export default CourseCreate
