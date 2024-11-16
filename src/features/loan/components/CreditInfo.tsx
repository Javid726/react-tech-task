import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import {
  Box,
  Button,
  Paper,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  SelectChangeEvent,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useAppSelector } from '../../../store/store';
import { useDispatch } from 'react-redux';
import { updateCreditInfo } from '../loanSlice';
import { ICreditInfo } from '../../../types/loanTypes';
import { CalendarMonth } from '@mui/icons-material';

type CreditInfoProps = {
  onNext: () => void;
  onBack: () => void;
};

const CreditInfo = ({ onNext, onBack }: CreditInfoProps) => {
  const { currency, purposeOfBusinessCredit, creditAmount, period, interest } =
    useAppSelector(state => state.loan.creditInfo);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreditInfo>({
    defaultValues: {
      currency,
      purposeOfBusinessCredit,
      creditAmount,
      period,
      interest,
    },
  });

  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<ICreditInfo> = (data: ICreditInfo) => {
    dispatch(updateCreditInfo(data));
    onNext();
  };

  return (
    <Paper variant="outlined" className="p-4 mt-2">
      <form className="flex flex-col w-4/5" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          <Grid size={4}>
            <Controller
              name="currency"
              control={control}
              rules={{ required: 'Valyuta doldurulmalıdır' }}
              render={({ field }) => {
                const handleChange = (event: SelectChangeEvent<string>) => {
                  const selectedCurrency = event.target.value as string;
                  dispatch(updateCreditInfo({ currency: selectedCurrency }));
                  field.onChange(event);
                };

                return (
                  <FormControl
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    error={!!errors.currency}
                  >
                    <InputLabel id="currency-label">Valyuta</InputLabel>
                    <Select
                      {...field}
                      value={currency || ''}
                      onChange={handleChange}
                      labelId="currency-label"
                      label="Valyuta"
                    >
                      <MenuItem value="AZN">AZN</MenuItem>
                      <MenuItem value="USD">USD</MenuItem>
                      <MenuItem value="EURO">EURO</MenuItem>
                    </Select>
                    <FormHelperText>
                      {errors.currency ? errors.currency.message : ''}
                    </FormHelperText>
                  </FormControl>
                );
              }}
            />
          </Grid>
          <Grid size={4}>
            <Controller
              name="purposeOfBusinessCredit"
              control={control}
              rules={{ required: 'Biznes kreditin məqsədi doldurulmalıdır' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Biznes kreditin məqsədi"
                  variant="outlined"
                  error={!!errors.purposeOfBusinessCredit}
                  helperText={
                    errors.purposeOfBusinessCredit
                      ? errors.purposeOfBusinessCredit.message
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
              name="creditAmount"
              control={control}
              rules={{ required: 'Məbləğ doldurulmalıdır' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Məbləğ"
                  variant="outlined"
                  typeof="number"
                  error={!!errors.creditAmount}
                  helperText={
                    errors.creditAmount ? errors.creditAmount.message : ''
                  }
                  fullWidth
                  type="number"
                  margin="normal"
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
                />
              )}
            />
          </Grid>
          <Grid size={4}>
            <Controller
              name="period"
              control={control}
              rules={{ required: 'Müddət doldurulmalıdır' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Müddət"
                  variant="outlined"
                  error={!!errors.period}
                  helperText={errors.period ? errors.period.message : ''}
                  fullWidth
                  margin="normal"
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <CalendarMonth />
                        </InputAdornment>
                      ),
                      inputProps: {
                        min: 0,
                        step: 0,
                      },
                    },
                  }}
                />
              )}
            />
          </Grid>
          <Grid size={4}>
            <Controller
              name="interest"
              control={control}
              rules={{ required: 'Faiz doldurulmalıdır' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Faiz"
                  variant="outlined"
                  type="number"
                  error={!!errors.interest}
                  helperText={errors.interest ? errors.interest.message : ''}
                  fullWidth
                  margin="normal"
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      ),
                      inputProps: {
                        min: 0,
                        step: 0,
                      },
                    },
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
        <Box className="self-end">
          <Button
            type="button"
            variant="outlined"
            onClick={onBack}
            className="mr-4 px-4"
          >
            Geri
          </Button>
          <Button type="submit" variant="contained">
            Növbəti
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default CreditInfo;
