import { Draggable } from "react-beautiful-dnd"
import React, { useMemo } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  makeStyles,
  Typography,
  Grid,
  Container,
  Box,
} from "@material-ui/core"
import DragIndicatorIcon from "@material-ui/icons/DragIndicator"

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

const ListItemCard = ({ item, provided, snapshot, index }) => {
  const classes = useStyles()
  return (
    <Container component="main" maxWidth="sm" style={{ padding: "0.25rem" }}>
      <Card
        ref={provided.innerRef}
        snapshot={snapshot}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <Grid container>
          <Grid item xs={1}>
            <Box padding="1rem">
              <Avatar className={classes.avcolor}>{index + 1}</Avatar>
            </Box>
          </Grid>
          <Grid item xs={10}>
            <CardContent>
              <Typography>{item.title}</Typography>
              <span>{item.content}</span>
            </CardContent>
          </Grid>
          <Grid item xs={1}>
            <Box padding="1rem">
              <DragIndicatorIcon />
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Container>
  )
}

export default ListItemCard
