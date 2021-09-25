import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import ListItem from "./ListItem"

const elements = [
  { id: "one", content: "one" },
  { id: "two", content: "fred" },
  { id: "three", content: "three" },
  { id: "four", content: "four" },
]

function DragAndDropList() {
  const [items, setItems] = useState(elements)

  const onDragEnd = (result) => {
    const newItems = Array.from(items)
    console.log(result)

    const [removed] = newItems.splice(result.source.index, 1)
    console.log("remove", [removed])
    newItems.splice(result.destination.index, 0, removed)
    setItems(newItems)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <ListItem
                    provided={provided}
                    snapshot={snapshot}
                    item={item}
                  />
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default DragAndDropList
