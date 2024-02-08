import Checkbox from '@mui/material/Checkbox';
import ExpandMore from '@mui/icons-material/ExpandMore';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { SelectProps } from '@mui/material/Select';
import { AlertTypes } from 'ts/types';
import styles from './SelectCheckbox.module.scss';

interface Option {
  value: AlertTypes;
  label: string;
  required?: boolean;
  disabled?: boolean;
  defaultChecked?: boolean;
}

interface SelectCheckboxProps {
  options: Option[];
  onChangeValue: (value: string) => void;
}

const SelectCheckbox = ({
  label,
  labelId,
  options,
  variant = 'outlined',
  size = 'small',
  onChangeValue,
  ...props
}: SelectProps & SelectCheckboxProps) => {
  return (
    <FormControl variant={variant} size={size}>
      {!!label && <InputLabel>{label}</InputLabel>}
      <Select
        className={styles.select}
        inputProps={{
          classes: {
            icon: styles.icon,
          },
        }}
        label={label}
        labelId={labelId}
        sx={{
          border: '1px solid red',
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
          '& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input': {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          },
        }}
        MenuProps={{
          disableScrollLock: true,
          transformOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        }}
        IconComponent={(props) => <ExpandMore fontSize="16" {...props} />}
        {...props}
      >
        <FormGroup className={styles.form}>
          {options &&
            options.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                sx={{ gap: '12px' }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      defaultChecked={option.defaultChecked}
                      onClick={(e) => {
                        onChangeValue(option.value);
                        e.stopPropagation();
                      }}
                    />
                  }
                  label={option.label}
                  labelPlacement="start"
                  required={option.required}
                  disabled={option.disabled}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                />
              </MenuItem>
            ))}
        </FormGroup>
      </Select>
    </FormControl>
  );
};

export default SelectCheckbox;
