import React from "react"
import { Draggable } from "react-beautiful-dnd"
import { Container } from "@material-ui/core"

export default class Task extends React.Component {
  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            innerRef={provided.innerRef}
          >
            {this.props.task.content}
          </Container>
        )}
      </Draggable>
    )
  }
}
