import { useContext, useState } from "react"
import { GridViewContext } from "./GridViewContext"
import Select from "muiComponents/Select/Select"
import styles from "./SurveillanceCarousel.module.scss"

const gridOptions = [
  { label: "Dynamic Carousel", value: "dynamic-carousel" },
  { label: "Other option", value: "other-option" },
]

function GridViewControls() {
  const [selectOption, setSelectOption] = useState("dynamic-carousel")
  // const { setGridView } = useContext(GridViewContext)

  function handleSelectChange(e) {
    setSelectOption(e.target.value)
  }

  return (
    <div className={styles.gridViewControls}>
      <Select
        label=""
        value={selectOption}
        options={gridOptions}
        onChange={handleSelectChange}
      />
    </div>
  )
}

export default GridViewControls
