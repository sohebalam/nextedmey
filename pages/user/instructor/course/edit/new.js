function ItemComponent({
  dragging,
  dragged,
  children: { title, description },
  ...rest
}) {
  return (
    <>
      <div {...rest} className={`list__item ${dragged ? "is-dragging" : ""}`}>
        <div className="list__item-content">
          <div className="list__item-title">{title}</div>
          <div className="list__item-description">{description}</div>
        </div>
      </div>
    </>
  )
}

export default ItemComponent

// ReactDOM.render(<Demo initialItems={items} />, document.getElementById("app"))
