import { useState } from "react"
import { ReactSortable } from "react-sortablejs"

const Card = () => {
  const [state, setState] = useState([
    { id: 1, name: "shrek" },
    { id: 2, name: "fiona" },
    { id: 3, name: "lik" },
  ])
  return (
    <ReactSortable list={state} setList={setState}>
      {state.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </ReactSortable>
  )
}

export default Card
