import { useContext } from "react"
import { GridViewContext } from "./GridViewContext"
import Select from "../muiComponents/Select/Select"
import styles from "./SurveillanceCarousel.module.scss"

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
    <div className={styles.gridViewControls}>
      <Select>
        {/* <select onChange={handleSelectChange} > */}
        {
          gridOptions && gridOptions.map(gridOption => (
            <option value={gridOption.value}>{gridOption.label}</option>
          ))
        }
        {/* </select> */}
      </Select>
    </div>
  )
}

export default GridViewControls
