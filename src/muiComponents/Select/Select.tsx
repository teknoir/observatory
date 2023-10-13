import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import { SelectProps } from "@mui/material/Select";
import { Options } from "ts/types"
import styles from "./Select.module.scss"

// TODO: handle id and name props in this component
export default function SelectMUI({ label, value, options, onChange }: SelectProps & { options: Options }) {
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
