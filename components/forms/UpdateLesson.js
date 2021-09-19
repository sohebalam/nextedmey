import {
  Button,
  CircularProgress,
  Grid,
  Switch,
  TextField,
  FormLabel,
  FormHelperText,
  FormControl,
  Typography,
  Box,
} from "@material-ui/core"
import ReactPlayer from "react-player"
import { CloseIcon } from "@material-ui/icons"
import UploadButton from "../layout/UploadButton"
// import { Typography } from "antd"
import LinearProgress from "@material-ui/core/LinearProgress"

const UpdateLessonForm = ({
  current,
  setCurrent,
  handelVideo,
  handelUpdateLesson,
  uploadVideoButtonText,
  progress,
  uploading,
}) => {
  // console.log(current.video.Location)
  return (
    <div className="container pt-3">
      <Grid container>
        <form onSubmit={handelUpdateLesson}>
          <Grid item>
            <TextField
              type="text"
              onChange={(e) =>
                setCurrent({ ...current, title: e.target.value })
              }
              value={current.title}
              placeholder="Title"
              autoFocus
              fullWidth={true}
              variant="outlined"
            />
            <TextField
              style={{ marginTop: "1rem" }}
              multiline
              minRows={2}
              maxRows={5}
              variant="outlined"
              fullWidth={true}
              onChange={(e) =>
                setCurrent({ ...current, content: e.target.value })
              }
              value={current.content}
              placeholder="Content"
            />
          </Grid>
          <Grid item style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
            <div>
              {!uploading && current.video && current.video.Location && (
                <div>
                  {/* {current.video.Location} */}
                  <ReactPlayer
                    url={current.video.Location}
                    width="410px"
                    height="240px"
                    controls
                  />
                </div>
              )}
            </div>

            {progress > 0 && (
              <LinearProgress
                variant="buffer"
                value={progress}
                valueBuffer={progress}
              />
            )}
            {/* <div className="d-flex justify-content-between"> */}
            <FormControl component="fieldset" variant="standard">
              {/* <FormLabel component="legend">Assign responsibility</FormLabel> */}
              <Switch
                className="float-right mt-2"
                disabled={uploading}
                // defaultChecked={current.free_preview}
                checked={current.free_preview}
                name="free_preview"
                onChange={(e) =>
                  setCurrent({
                    ...current,
                    free_preview: e.target.checked,
                  })
                }
              />
              <FormHelperText>Free Preview</FormHelperText>
            </FormControl>
            {/* </div> */}
          </Grid>
          {/* <UploadButton>
            <Input onChange={handelVideo} type="file" accept="video/*" hidden />
          </UploadButton> */}
          <label className="button">
            <Typography
              style={{ fontSize: 15, fontFamily: "Roboto, sans-serif" }}
            >
              {uploadVideoButtonText ? uploadVideoButtonText : "Upload"}
            </Typography>
            <input onChange={handelVideo} type="file" accept="video/*" hidden />
          </label>

          <Button
            onClick={handelUpdateLesson}
            className="col mt-2"
            fullWidth
            color="primary"
            disabled={uploading}
            variant="outlined"
          >
            Save
          </Button>
        </form>
      </Grid>
    </div>
  )
}

export default UpdateLessonForm
