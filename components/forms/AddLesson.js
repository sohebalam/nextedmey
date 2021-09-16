import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Input,
  InputLabel,
  makeStyles,
  TextField,
  Tooltip,
} from "@material-ui/core"

import { Cancel } from "@material-ui/icons"
import UploadButton from "../layout/UploadButton"
import LinearProgress from "@material-ui/core/LinearProgress"

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
  progress,
  handelVideoRemove,
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

        <Box mt="0.75rem" mb="0.75rem">
          <Grid container>
            <Grid item xs={!uploading && values.video.Location ? 11 : 12}>
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
            </Grid>
            <Grid item xs="auto">
              {!uploading && values.video.Location && (
                <Box padding="0.3rem">
                  <Tooltip title="Remove">
                    <span onClick={handelVideoRemove}>
                      <Cancel />
                    </span>
                  </Tooltip>
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>

        {progress > 0 && (
          <LinearProgress
            variant="buffer"
            value={progress}
            valueBuffer={progress}
          />
        )}
        {uploading && <CircularProgress />}
        <Button
          style={{ marginTop: "0.5rem" }}
          onClick={handleAddLesson}
          variant="outlined"
          className="mb-3"
          fullWidth
          color="primary"
          disabled={uploading}
        >
          Save
        </Button>
        {/* <UploadButton /> */}
      </form>
    </div>
  )
}

export default AddLessonForm
