import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Button, Paper, TextField, InputAdornment } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { updateCustomerInfo } from '../loanSlice';
import { ICustomerInfo } from '../../../types/loanTypes';

import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../store/store';

type CustomerInfoProps = {
  onNext: () => void;
};

const CustomerInfo = ({ onNext }: CustomerInfoProps) => {
  const {
    activityField,
    monthlyIncome,
    yearOfExperience,
    monthOfExperience,
    region,
    businessAddress,
  } = useAppSelector(store => store.loan.customerInfo);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ICustomerInfo>({
    defaultValues: {
      activityField,
      monthlyIncome,
      yearOfExperience,
      monthOfExperience,
      region,
      businessAddress,
    },
  });

  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<ICustomerInfo> = (data: ICustomerInfo) => {
    dispatch(updateCustomerInfo(data));
    onNext();
  };

  return (
    <Paper variant="outlined" className="p-4 mt-2">
      <form className="flex flex-col w-4/5" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          <Grid size={4}>
            <Controller
              name="activityField"
              control={control}
              rules={{ required: 'Fəaliyyət sektoru doldurulmalıdır' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Fəaliyyət sektoru"
                  variant="outlined"
                  error={!!errors.activityField}
                  helperText={
                    errors.activityField ? errors.activityField.message : ''
                  }
                  fullWidth
                  margin="normal"
                />
              )}
            />
          </Grid>
          <Grid size={4}>
            <Controller
              name="monthlyIncome"
              control={control}
              rules={{ required: 'Aylıq gəlir doldurulmalıdır' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Aylıq gəliri"
                  variant="outlined"
                  type="number"
                  error={!!errors.monthlyIncome}
                  helperText={
                    errors.monthlyIncome ? errors.monthlyIncome.message : ''
                  }
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">$</InputAdornment>
                      ),
                      inputProps: {
                        min: 0,
                        step: 0,
                      },
                    },
                  }}
                  fullWidth
                  margin="normal"
                />
              )}
            />
          </Grid>
          <Grid size={4}>
            <Controller
              name="yearOfExperience"
              control={control}
              rules={{ required: 'İş təcrübəsi (il) doldurulmalıdır' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="İş təcrübəsi (il)"
                  variant="outlined"
                  type="number"
                  error={!!errors.yearOfExperience}
                  helperText={
                    errors.yearOfExperience
                      ? errors.yearOfExperience.message
                      : ''
                  }
                  fullWidth
                  margin="normal"
                />
              )}
            />
          </Grid>
          <Grid size={4}>
            <Controller
              name="monthOfExperience"
              control={control}
              rules={{ required: 'İş təcrübəsi (ay) doldurulmalıdır' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="İş təcrübəsi (ay)"
                  type="number"
                  variant="outlined"
                  error={!!errors.monthOfExperience}
                  helperText={
                    errors.monthOfExperience
                      ? errors.monthOfExperience.message
                      : ''
                  }
                  fullWidth
                  margin="normal"
                />
              )}
            />
          </Grid>
          <Grid size={4}>
            <Controller
              name="region"
              control={control}
              rules={{ required: 'Region doldurulmalıdır' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Region"
                  variant="outlined"
                  error={!!errors.region}
                  helperText={errors.region ? errors.region.message : ''}
                  fullWidth
                  margin="normal"
                />
              )}
            />
          </Grid>
          <Grid size={4}>
            <Controller
              name="businessAddress"
              control={control}
              rules={{ required: 'Biznes ünvanı doldurulmalıdır' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Biznes ünvanı"
                  variant="outlined"
                  error={!!errors.businessAddress}
                  helperText={
                    errors.businessAddress ? errors.businessAddress.message : ''
                  }
                  fullWidth
                  margin="normal"
                />
              )}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" className="self-end">
          Növbəti
        </Button>
      </form>
    </Paper>
  );
};

export default CustomerInfo;
