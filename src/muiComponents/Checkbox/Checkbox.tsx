import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';

const options = [
  { label: 'Option1', required: false, disabled: false, defaultChecked: true },
  { label: 'Option2', required: true, disabled: false, defaultChecked: false },
  { label: 'Option3', required: false, disabled: true, defaultChecked: false },
];

const CheckboxMUI = () => {
  return (
    <FormGroup>
      {options &&
        options.map((option) => (
          <FormControlLabel
            control={<Checkbox defaultChecked={option.defaultChecked} />}
            label={option.label}
            required={option.required}
            disabled={option.disabled}
          />
        ))}
    </FormGroup>
  );
};

export default CheckboxMUI;
