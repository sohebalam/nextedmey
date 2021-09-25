import React from "react"
import { motion } from "framer-motion"
import { usePositionReorder } from "./usePositionReorder"
import { useMeasurePosition } from "./useMeasurePosition"

const List = ["Item One", "Item Two", "Item Three", "Item Four"]

export default function App() {
  const [updatedList, updatePosition, updateOrder] = usePositionReorder(List)

  return (
    <ul className="container">
      {updatedList.map((name, index) => (
        <Item
          key={name}
          ind={index}
          updateOrder={updateOrder}
          updatePosition={updatePosition}
          name={name}
        />
      ))}
    </ul>
  )
}

function Item({ name, updateOrder, updatePosition, ind }) {
  const [isdragged, setIsDragged] = React.useState(false)

  const itemRef = useMeasurePosition((pos) => updatePosition(ind, pos))

  return (
    <li>
      <motion.div
        style={{
          zIndex: isdragged ? 2 : 1,
          height: name.length * 10,
        }}
        dragConstraints={{
          top: 0,
          bottom: 0,
        }}
        dragElastic={1}
        layout
        ref={itemRef}
        onDragStart={() => setIsDragged(true)}
        onDragEnd={() => setIsDragged(false)}
        animate={{
          scale: isdragged ? 1.05 : 1,
        }}
        onViewportBoxUpdate={(_, delta) => {
          isdragged && updateOrder(ind, delta.y.translate)
        }}
        drag="y"
      >
        {name}
      </motion.div>
    </li>
  )
}
