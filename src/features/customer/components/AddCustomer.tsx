import { InputAdornment } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { ICustomerState } from '../../../types/customerTypes';

import { useDispatch } from 'react-redux';

import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { addCustomer } from '../customerSlice';

type AddCustomerProps = {
  open: boolean;
  handleClose: () => void;
};

const AddCustomer = ({ open, handleClose }: AddCustomerProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICustomerState>({});

  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<ICustomerState> = (data: ICustomerState) => {
    dispatch(addCustomer(data));
    handleClose();
    reset();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Controller
              name="identityNumber"
              control={control}
              rules={{ required: 'FİN nömrəsi doldurulmalıdır' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="FIN"
                  variant="outlined"
                  error={!!errors.identityNumber}
                  helperText={
                    errors.identityNumber ? errors.identityNumber.message : ''
                  }
                  fullWidth
                  margin="normal"
                />
              )}
            />
            <Controller
              name="serialNumber"
              control={control}
              rules={{ required: 'Seriya nömrəsi doldurulmalıdır' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Seriya"
                  variant="outlined"
                  error={!!errors.serialNumber}
                  helperText={
                    errors.serialNumber ? errors.serialNumber.message : ''
                  }
                  fullWidth
                  margin="normal"
                />
              )}
            />
            <Controller
              name="firstName"
              control={control}
              rules={{ required: 'Ad doldurulmalıdır' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Ad"
                  variant="outlined"
                  error={!!errors.firstName}
                  helperText={errors.firstName ? errors.firstName.message : ''}
                  fullWidth
                  margin="normal"
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              // defaultValue=""
              rules={{ required: 'Soyad doldurulmalıdır' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Soyad"
                  variant="outlined"
                  error={!!errors.lastName}
                  helperText={errors.lastName ? errors.lastName.message : ''}
                  fullWidth
                  margin="normal"
                />
              )}
            />
            <Controller
              name="patronymic"
              control={control}
              rules={{ required: 'Ata adı doldurulmalıdır' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Ata adı"
                  variant="outlined"
                  error={!!errors.patronymic}
                  helperText={
                    errors.patronymic ? errors.patronymic.message : ''
                  }
                  fullWidth
                  margin="normal"
                />
              )}
            />
            <Controller
              name="registrationAddress"
              control={control}
              rules={{ required: 'Qeydiyyat ünvanı doldurulmalıdır' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Qeydiyyat ünvanı"
                  variant="outlined"
                  error={!!errors.registrationAddress}
                  helperText={
                    errors.registrationAddress
                      ? errors.registrationAddress.message
                      : ''
                  }
                  fullWidth
                  margin="normal"
                />
              )}
            />
            <Controller
              name="birthDate"
              control={control}
              rules={{ required: 'Doğum tarixi doldurulmalıdır' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Doğum tarixi"
                  variant="outlined"
                  type="date"
                  slotProps={{
                    inputLabel: { shrink: true },
                  }}
                  error={!!errors.birthDate}
                  helperText={errors.birthDate ? errors.birthDate.message : ''}
                  fullWidth
                  margin="normal"
                />
              )}
            />
            <Controller
              name="phoneNumber"
              control={control}
              rules={{ required: 'Telefon nömrəsi doldurulmalıdır' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Telefon nömrəsi"
                  variant="outlined"
                  error={!!errors.phoneNumber}
                  helperText={
                    errors.phoneNumber ? errors.phoneNumber.message : ''
                  }
                  fullWidth
                  margin="normal"
                  type="number"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">+994</InputAdornment>
                      ),
                    },
                  }}
                />
              )}
            />
            <Controller
              name="actualAddress"
              control={control}
              rules={{ required: 'First name is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Faktiki ünvan"
                  variant="outlined"
                  error={!!errors.actualAddress}
                  helperText={
                    errors.actualAddress ? errors.actualAddress.message : ''
                  }
                  fullWidth
                  margin="normal"
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button type="button" onClick={handleClose}>
              Ləğv edin
            </Button>
            <Button type="submit" variant="contained">
              Əlavə edin
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default AddCustomer;
