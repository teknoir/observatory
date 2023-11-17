import ExpandMore from '@mui/icons-material/ExpandMore';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { SelectProps } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { Options } from 'ts/types';
import styles from './Select.module.scss';

// TODO: handle id and name props in this component
export default function SelectMUI({
  label,
  labelId,
  value,
  options,
  variant = 'outlined',
  size = 'small',
  onChange,
  ...props
}: SelectProps & { options: Options }) {
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
        value={value}
        onChange={onChange}
        sx={{
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
          '& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input': {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          },
        }}
        MenuProps={{ disableScrollLock: true }}
        IconComponent={(props) => <ExpandMore fontSize="16" {...props} />}
        {...props}
      >
        {options &&
          options.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              sx={{ gap: '12px' }}
            >
              {option.icon && (
                <img
                  src={option.icon}
                  alt={option.label}
                  className={styles.layoutIcon}
                />
              )}
              <Typography variant="LabelMedium">{option.label}</Typography>
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}
