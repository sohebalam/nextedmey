import {
  Box,
  Button,
  CircularProgress,
  Input,
  InputLabel,
  makeStyles,
  TextField,
  Tooltip,
} from "@material-ui/core"

import { Cancel } from "@material-ui/icons"
import UploadButton from "../layout/UploadButton"

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
}))

const AddLessonForm = ({
  values,
  setValues,
  handleAddLesson,
  uploading,
  uploadButtonText,
  handelVideo,
  //   progress,
  //   handelVideoRemove,
}) => {
  const classes = useStyles()
  return (
    <div className="container pt-3">
      <form>
        <TextField
          type="text"
          margin="normal"
          variant="outlined"
          className="form-control square"
          onChange={(e) => setValues({ ...values, title: e.target.value })}
          value={values.title}
          placeholder="Title"
          autoFocus
          required
        />
        <TextField
          multiline
          minRows={6}
          maxRows={6}
          variant="outlined"
          margin="normal"
          className="form-control mt-3"
          onChange={(e) => setValues({ ...values, content: e.target.value })}
          value={values.content}
          placeholder="Content"
        ></TextField>

        <Box mt="0.75rem">
          <input
            accept="video/*"
            className={classes.input}
            id="icon-button-file"
            multiple
            onChange={handelVideo}
            type="file"
          />
          <InputLabel htmlFor="icon-button-file">
            <Button
              component="span"
              aria-label="upload"
              fullWidth={true}
              variant="outlined"
              color="secondary"
            >
              {uploadButtonText}
            </Button>
          </InputLabel>
        </Box>

        <Tooltip title="Remove">
          {/* <span onClick={handelVideoRemove} className="pt-1 pl-3"> */}
          <Cancel className="text-danger d-flex justify-content-center pt-4 pointer" />
          {/* </span> */}
        </Tooltip>

        {/* {progress > 0 && (
          <CircularProgress
            className="d-flex justify-content-center pt-2"
            // percent={progress}
            steps={10}
          />
        )} */}
        <Button
          onClick={handleAddLesson}
          variant="outlined"
          className="mb-3"
          fullWidth
          color="primary"
          //   loading={uploading}
        >
          Save
        </Button>
        {/* <UploadButton /> */}
      </form>
    </div>
  )
}

export default AddLessonForm
