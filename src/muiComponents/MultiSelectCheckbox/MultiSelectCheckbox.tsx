import Checkbox from '@mui/material/Checkbox';
import FilterList from '@mui/icons-material/FilterList';
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
import styles from './MultiSelectCheckbox.module.scss';

interface Option {
  value: string;
  label: string;
  icon: string;
  required?: boolean;
  disabled?: boolean;
  defaultChecked?: boolean;
}

interface SelectCheckboxProps {
  options: Option[];
  value: string[];
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
    <FormControl
      variant={variant}
      size={size}
      sx={{
        '& .MuiSvgIcon-root': {
          marginRight: '12px',
        },
        '& .MuiSelect-iconOpen': {
          transform: 'none',
        },
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
            horizontal: 'right',
          },
          classes: { paper: styles.menu },
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

export default SelectCheckbox;
