import { useNavigate } from 'react-router-dom';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import styles from "./Form.module.scss";

const schema = zod
  .object({
    hasTheft: zod.boolean(),
    comment: zod.string().min(1, { message: "Comment is required" }),
  })
  .required()

interface IFormValues {
  hasTheft: boolean;
  comment: string;
}

const Form = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm<IFormValues>({
    defaultValues: {
      hasTheft: false,
      comment: "",
    },
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    console.log(data)
  }

  return (
    <div className={styles.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.rowRadio}>
          <FormLabel id="demo-row-radio-buttons-group-label" className={styles.label}>
            Was this an actual theft?
          </FormLabel>
          <Controller
            name="hasTheft"
            control={control}
            render={({ field }) =>
              <RadioGroup
                {...field}
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={(e) => {
                  const value = e.target.value === 'true';
                  field.onChange(value);
                }}
              >
                <FormControlLabel value={true} control={<Radio />} label="YES" />
                <FormControlLabel value={false} control={<Radio />} label="NO" />
              </RadioGroup>
            }
          />
        </div>
        <div className={styles.row}>
          <Controller
            name="comment"
            control={control}
            render={({ field }) =>
              <TextField
                {...field}
                label="Comment"
                rows={4}
                multiline
                fullWidth
              />
            }
          />
          <FormHelperText error>{errors.comment?.message}</FormHelperText>
        </div>
        <Stack spacing={2} direction="row">
          <Button
            variant="outlined"
            color="inherit"
            fullWidth
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            fullWidth
            type="submit"
          >
            Confirm
          </Button>
        </Stack>
      </form>
    </div>
  );
}

export default Form;
