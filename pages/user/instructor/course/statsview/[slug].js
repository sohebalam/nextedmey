import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import InstructorRoute from "../../../../components/routes/InstructorRoute"
import axios from "axios"
import { Avatar, Tooltip, Button, Modal, List } from "antd"
import {
  EditOutlined,
  CheckOutlined,
  UploadOutlined,
  QuestionCircleFilled,
  QuestionOutlined,
  CloseOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons"
import Item from "antd/lib/list/Item"
import ReactMarkdown from "react-markdown"
import { toast } from "react-toastify"

import AddLessonForm from "../../../../components/forms/addLessonForm"

const CourseView = () => {
  const [course, setCourse] = useState({})
  const [visible, setVisible] = useState(false)
  const [values, setValues] = useState({
    title: "",
    content: "",
    video: "",
  })

  const [uploading, setUploading] = useState(false)
  const [uploadButtonText, setUploadButtonText] = useState("Upload Video")
  const [progress, setProgress] = useState()

  const router = useRouter()
  const { slug } = router.query

  useEffect(() => {
    loadCourse()
  }, [slug])
  const loadCourse = async () => {
    const { data } = await axios.get(`/api/course/${slug}`)
    setCourse(data)
  }

  const handleAddLesson = async (e) => {
    e.preventDefault()

    try {
      const { data } = await axios.post(
        `/api/course/lesson/${slug}/${course.instructor._id}`,
        values
      )

      setValues({ ...values, title: "", content: "", video: {} })
      setProgress(0)
      setUploadButtonText("Upload video")
      setVisible(false)
      setCourse(data)
      toast("Lesson added")
    } catch (error) {
      console.log(error)
      toast("Lesson add failed")
    }
  }

  const handelVideo = async (e) => {
    // console.log(course)

    try {
      const file = e.target.files[0]
      setUploadButtonText(file.name)
      setUploading(true)
      const videoData = new FormData()

      videoData.append("video", file)

      const { data } = await axios.post(
        `/api/course/video-upload/${course.instructor._id}`,
        videoData,
        {
          onUploadProgress: (e) =>
            setProgress(Math.round((100 * e.loaded) / e.total)),
        }
      )

      console.log(data)
      setValues({ ...values, video: data })
      setUploading(false)
      toast("Video Upload Success")
    } catch (error) {
      console.log(error)
      setUploading(false)
      toast("Video Upload Failed")
    }
  }

  const handelVideoRemove = async () => {
    try {
      setUploading(true)
      const { data } = await axios.post(
        `/api/course/video-remove/${course.instructor._id}`,
        values.video
      )
      console.log(data)
      setValues({ ...values, video: {} })
      setUploading(false)
      setUploadButtonText("Upload another video")
    } catch (err) {
      console.log(err)
      setUploading(false)
      toast("Video remove failed")
    }
  }

  const handlePublish = async (e, courseId) => {
    try {
      let answer = window.confirm(
        "One you publish your course, it will be live in the marketplace for users to enroll"
      )
      if (!answer) return

      const { data } = await axios.put(`/api/course/publish/${courseId}`)
      toast(" course is live")
      setCourse(data)
    } catch (error) {
      toast("Publish failed, course is not live")
    }
  }

  const handleUnpublish = async (e, courseId) => {
    try {
      let answer = window.confirm(
        "One you Un-Publish your course, it will  not be live in the marketplace for users to enroll"
      )
      if (!answer) return
      const { data } = await axios.put(`/api/course/unpublish/${courseId}`)
      toast(" course is not live")
      setCourse(data)
    } catch (error) {
      toast("UnPublish failed, course is live")
    }
  }

  return (
    <InstructorRoute>
      <div className="contianer-fluid pt-3">
        {/* <pre>{JSON.stringify(course, null, 4)}</pre> */}
        {course && (
          <div className="container-fluid pt-1">
            <div className="media pt-2">
              <Avatar
                size={80}
                src={course.image ? course.image.Location : "/course.png"}
              />

              <div className="media-body pl-2">
                <div className="row">
                  <div className="col">
                    <h5 className="mt-2 text-primary">{course.name}</h5>
                    <p style={{ marginTop: "-10px" }}>
                      {course.lessons && course.lessons.length} Lessons
                    </p>
                    <p style={{ marginTop: "-15px", fontSize: "10px" }}>
                      {course.category}
                    </p>
                  </div>

                  <div>
                    <Tooltip title="Edit">
                      <EditOutlined
                        onClick={() =>
                          router.push(`/instructor/course/edit/${slug}`)
                        }
                        className="h5 pointer text-warning mr-4"
                      />
                    </Tooltip>
                    {course.lessons && course.lessons.length < 5 ? (
                      <Tooltip title="Min 5 lessons required to publish">
                        <QuestionOutlined className="h5 pointer text-danger" />
                      </Tooltip>
                    ) : course.published ? (
                      <Tooltip title="Unpublish">
                        <CloseOutlined
                          // onClick={handlePublish}
                          onClick={(e) => handleUnpublish(e, course._id)}
                          className="h5 pointer text-danger"
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Publish">
                        <CheckOutlined
                          onClick={(e) => handlePublish(e, course._id)}
                          className="h5 pointer text-success"
                        />
                      </Tooltip>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col">
                <ReactMarkdown>{course.description}</ReactMarkdown>,
              </div>
            </div>
            <div className="row">
              <Button
                className="col-md-6 offset-md-3 text-center"
                type="primary"
                shape="round"
                icon={<UploadOutlined />}
                size="large"
                onClick={() => setVisible(true)}
              >
                Add Lesson
              </Button>
            </div>
            <br />
            <Modal
              title="+ Add Lesson"
              centered
              visible={visible}
              onCancel={() => setVisible(false)}
              footer={null}
            >
              <AddLessonForm
                values={values}
                setValues={setValues}
                handleAddLesson={handleAddLesson}
                uploading={uploading}
                uploadButtonText={uploadButtonText}
                handelVideo={handelVideo}
                progress={progress}
                handelVideoRemove={handelVideoRemove}
              />
            </Modal>

            <div className="row pb-5">
              <div className="col lesson-list">
                <h4>
                  {course && course.lessons && course.lessons.length} Lessons
                </h4>
                <List
                  itemLayout="horizontal"
                  dataSource={course && course.lessons}
                  renderItem={(item, index) => (
                    <Item>
                      <Item.Meta
                        avatar={<Avatar>{index + 1}</Avatar>}
                        title={item.title}
                      ></Item.Meta>
                    </Item>
                  )}
                ></List>
              </div>
            </div>
          </div>
        )}
      </div>
    </InstructorRoute>
  )
}

export default CourseView
