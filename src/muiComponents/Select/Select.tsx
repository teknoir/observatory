import FormControl from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import styles from "./Select.module.scss"
import { SelectProps } from "ts/types"

export default function SelectMUI({ label, value, options, onChange }: SelectProps) {
  return (
    <FormControl>
      <Select
        className={styles.select}
        inputProps={{
          classes: {
            icon: styles.icon
          },
        }}
        id="select"
        label={label}
        value={value}
        onChange={onChange}
      >
        {
          options && options.map(option => (
            <MenuItem
              key={option.value}
              value={option.value}
            >
              {option.label}
            </MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
}
