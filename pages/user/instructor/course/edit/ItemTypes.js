import React from "react"
// import ReactDOM from "react-dom"
import DraggableList from "react-draggable-lists"

// import "./styles.css"

const ItemTypes = () => {
  return (
    <div>
      <div className="App">
        <div style={{ width: 300, margin: "0 auto" }}>
          <DraggableList width={300} height={100} rowSize={1}>
            <div style={{ width: 300, height: 100, background: "green" }}>
              1
            </div>
            <div style={{ width: 300, height: 100, background: "blue" }}>2</div>
            <div style={{ width: 300, height: 100, background: "red" }}>3</div>
          </DraggableList>
        </div>
      </div>
    </div>
  )
}

export default ItemTypes
