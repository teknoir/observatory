import Checkbox from '@mui/material/Checkbox';
import FilterList from '@mui/icons-material/FilterList';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { SelectProps } from '@mui/material/Select';
import styles from './SelectCheckbox.module.scss';
import Icon from 'components/Icon/Icon';
import { AlertTypes, IconSizes } from 'ts/types';
import { OutlinedInput } from '@mui/material';

interface Option {
  value: AlertTypes;
  label: string;
  icon: string;
  required?: boolean;
  disabled?: boolean;
  defaultChecked?: boolean;
}

interface SelectCheckboxProps {
  options: Option[];
  value: AlertTypes[];
  onChange: (e: SelectChangeEvent<unknown>) => void;
}

const SelectCheckbox = ({
  label,
  labelId,
  options,
  variant = 'outlined',
  size = 'small',
  value,
  onChange,
  ...props
}: SelectProps & SelectCheckboxProps) => {
  return (
    <FormControl variant={variant} size={size}>
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
            horizontal: 'right',
          },
        }}
        IconComponent={(props) => <FilterList fontSize="16" {...props} />}
        {...props}
      >
        {options &&
          options.map((option) => (
            <MenuItem
              className={styles.menuItem}
              key={option.value}
              value={option.value}
            >
              <Icon icon={option.icon} size={IconSizes.lg} />
              <Checkbox checked={value.indexOf(option.value) > -1} />
              <ListItemText primary={option.label} />
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default SelectCheckbox;
