import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { AlertTypes, IAlertFormValues } from 'ts/types';
import styleVariables from 'enums/styleVariables.module.scss';
import styles from './Form.module.scss';

const schema = zod
  .object({
    ground_truth: zod.nativeEnum(AlertTypes),
    comment: zod.string().min(1, { message: 'Comment is required' }),
  })
  .required();

interface Props {
  onSubmit: (values: IAlertFormValues) => void;
  typeDetected: AlertTypes;
}

const selectOptions = [
  { value: AlertTypes.theft, label: 'Theft' },
  { value: AlertTypes.loitering, label: 'Loitering' },
  { value: AlertTypes.on_ground, label: 'Man down' },
  { value: AlertTypes.no_alert, label: 'No alert' },
];

const styleBorders = {
  '& .MuiOutlinedInput-notchedOutline': {
    borderRadius: '0',
    borderColor: styleVariables.offWhite,
  },
};

const Form = ({ onSubmit, typeDetected }: Props) => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IAlertFormValues>({
    defaultValues: {
      ground_truth: typeDetected,
      comment: '',
    },
    resolver: zodResolver(schema),
  });

  return (
    <div className={styles.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.row}>
          <Typography variant="LabelXLBold">Detected alert:</Typography>
          <br />
          <Controller
            name="ground_truth"
            control={control}
            render={({ field }) => (
              <Select
                labelId="alert-type-select"
                className={styles.select}
                sx={styleBorders}
                {...field}
              >
                {selectOptions.map((option) => {
                  return (
                    <MenuItem key={option.value} value={option.value}>
                      <Typography variant="BodyLarge">
                        {option.label}
                      </Typography>
                    </MenuItem>
                  );
                })}
              </Select>
            )}
          />
        </div>
        <div className={styles.row}>
          <Controller
            name="comment"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={<Typography variant="BodyMedium">Comment</Typography>}
                rows={4}
                multiline
                fullWidth
                sx={styleBorders}
              />
            )}
          />
          <FormHelperText error>{errors.comment?.message}</FormHelperText>
        </div>
        <Stack spacing={2} direction="row">
          <Button
            variant="outlined"
            color="inherit"
            fullWidth
            onClick={() => navigate(-1)}
            disabled={isSubmitting}
          >
            <Typography variant="LabelLarge">Dismiss</Typography>
          </Button>
          <Button
            variant="contained"
            fullWidth
            type="submit"
            disabled={isSubmitting}
          >
            <Typography variant="LabelLarge">Verify</Typography>
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default Form;
