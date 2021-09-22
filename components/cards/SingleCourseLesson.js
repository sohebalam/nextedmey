import {
  Grid,
  Avatar,
  ListItem,
  ListItemAvatar,
  makeStyles,
} from "@material-ui/core"
import { Box } from "@mui/system"
import { List } from "antd"

const useStyles = makeStyles((theme) => ({
  avcolor: {
    backgroundColor: theme.palette.primary.main,
  },
}))

const SingleCourseLesson = ({
  lessons,
  setPreview,
  showModal,
  setShowModal,
}) => {
  const classes = useStyles()
  return (
    <Grid container>
      <hr />
      <Grid item>
        <Box>
          {lessons && <h4>{lessons.length} Lessons</h4>}
          <hr />
          <List
            itemLayout="horizontal"
            dataSource={lessons}
            renderItem={(item, index) => (
              <Grid container key={item._id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classes.avcolor}>{index + 1}</Avatar>
                  </ListItemAvatar>
                  {item.title}
                  <Box style={{ marginLeft: "1rem" }}>
                    {item.video && item.video !== null && item.free_preview && (
                      <span
                        className="text-primary pointer"
                        onClick={() => {
                          setPreview(item.video.Location),
                            setShowModal(!showModal)
                        }}
                      >
                        Preview
                      </span>
                    )}
                  </Box>
                </ListItem>
              </Grid>
            )}
          />
        </Box>
      </Grid>
    </Grid>
  )
}

export default SingleCourseLesson
