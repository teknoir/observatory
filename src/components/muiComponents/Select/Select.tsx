import FormControl from "@mui/material/InputLabel"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import styles from "./Select.module.scss"

export default function SelectMUI({ children }) {
  return (
    <FormControl>
      <InputLabel id="demo-simple-select-label">Age</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        // value={age}
        label="Age"
      // onChange={handleChange}
      >
        {/* <MenuItem value={10}>Ten</MenuItem> */}
        {/* <MenuItem value={20}>Twenty</MenuItem> */}
        {/* <MenuItem value={30}>Thirty</MenuItem> */}
        {children}
      </Select>
    </FormControl>
  );
}
