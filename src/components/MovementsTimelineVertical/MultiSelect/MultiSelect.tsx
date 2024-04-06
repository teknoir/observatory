import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { SelectProps } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Icon from 'components/Icon/Icon';
import { IconSizes } from 'ts/types';
import styles from './MultiSelect.module.scss';

interface Option {
  value: string;
  label: string;
  icon: string;
  required?: boolean;
  disabled?: boolean;
  defaultChecked?: boolean;
}

interface MultiSelectProps {
  options: Option[];
  value: string[];
  onChange: (e: SelectChangeEvent<unknown>) => void;
}

const MultiSelect = ({
  label,
  labelId,
  options,
  variant = 'outlined',
  value,
  onChange,
  ...props
}: SelectProps & MultiSelectProps) => {
  return (
    <FormControl
      variant={variant}
      fullWidth
      sx={{
        padding: '20px',
      }}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        labelId={labelId}
        multiple
        value={value}
        onChange={onChange}
        input={<OutlinedInput label={label} />}
        renderValue={() => null}
        MenuProps={{
          transformOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          classes: { paper: styles.menu },
        }}
        {...props}
      >
        {options &&
          options.map((option) => (
            <MenuItem
              className={styles.menuItem}
              key={option.value}
              value={option.value}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'transparent',
                },
                '& .MuiListItemText-root': {
                  marginLeft: '16px',
                },
              }}
            >
              <Icon icon={option.icon} size={IconSizes.lg} />
              <ListItemText
                primary={
                  <Typography variant="BodyMedium">{option.label}</Typography>
                }
              />
              <Checkbox
                checked={value.indexOf(option.value) > -1}
                sx={{
                  '&.MuiButtonBase-root.MuiCheckbox-root': {
                    borderRadius: '5px',
                    width: '18px',
                    height: '18px',
                    backgroundColor: 'white',
                  },
                }}
              ></Checkbox>
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelect;
