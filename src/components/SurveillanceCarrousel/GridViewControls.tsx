import { useContext } from "react"
import { GridViewContext } from "./GridViewContext"

const gridOptions = [
  { label: "1 Camera", value: "one-camera" },
  { label: "2 Cameras", value: "two-camera" },
  { label: "3 Cameras", value: "three-camera" },
]

function GridViewControls() {
  const { setGridView } = useContext(GridViewContext)

  function handleSelectChange(e) {
    setGridView(e.target.value)
  }

  return (
    <>
      <select onChange={handleSelectChange} >
        {
          gridOptions && gridOptions.map(gridOption => (
            <option value={gridOption.value} key={gridOption.value}>{gridOption.label}</option>
          ))
        }
      </select>
    </>
  )
}

export default GridViewControls
