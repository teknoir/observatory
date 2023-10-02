function GridViewControls() {
  const gridOptions = [
    { label: "1 Camera", value: "one-camera" },
    { label: "2 Cameras", value: "two-camera" },
  ]
  return (
    <>
      <select>
        {
          gridOptions && gridOptions.map(gridOption => (
            <option>{gridOption.label}</option>
          ))
        }
      </select>
    </>
  )
}

export default GridViewControls
