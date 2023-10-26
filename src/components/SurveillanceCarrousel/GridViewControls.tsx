import { /* useContext, */ useState } from "react"
import { SelectChangeEvent } from "@mui/material/Select";
import Select from "muiComponents/Select/Select"
import styles from "./SurveillanceCarousel.module.scss"

const gridOptions = [
  { label: "Dynamic Carousel", value: "dynamic-carousel" },
  { label: "Other option", value: "other-option" },
]

function GridViewControls() {
  const [selectOption, setSelectOption] = useState("dynamic-carousel")
  // const { setGridView } = useContext(GridViewContext)

  function handleSelectChange(e: SelectChangeEvent<unknown>) {
    setSelectOption(e.target.value as string)
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
