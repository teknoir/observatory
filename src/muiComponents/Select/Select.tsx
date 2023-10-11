import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import styles from "./Select.module.scss"
import { SelectProps } from "ts/types"

// TODO: handle id and name props in this component
export default function SelectMUI({ label, value, options, onChange }: SelectProps) {
  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <Select
        className={styles.select}
        inputProps={{
          classes: {
            icon: styles.icon
          },
        }}
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
