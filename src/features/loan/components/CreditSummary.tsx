import { Box, Button, Divider, Grid2, Paper } from '@mui/material';
import { useState } from 'react';
import { useAppSelector } from '../../../store/store';
import ConfirmationDialog from '../../../components/ConfirmationDialog';
import { useAppDispatch } from '../../../store/store';
import { updateCreditInfo } from '../loanSlice';

const CreditSummary = () => {
  const { customerInfo, creditInfo, creditGuarantor, creditCalculator } =
    useAppSelector(store => store.loan);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'approve' | 'reject' | null>(
    null,
  );
  const dispatch = useAppDispatch();

  const handleOpenDialog = (type: 'approve' | 'reject') => {
    setDialogType(type);
    setDialogOpen(true);
  };

  const handleConfirm = (reason?: string) => {
    if (dialogType === 'approve') {
      dispatch(updateCreditInfo({ status: 'Approved' }));
    } else if (dialogType === 'reject') {
      dispatch(
        updateCreditInfo({ status: 'Rejected', rejectionReason: reason }),
      );
    }
    setDialogOpen(false);
    setDialogType(null);
  };

  return (
    <Paper variant="outlined" className="h-4/5 p-4">
      <Grid2 container spacing={8}>
        <Grid2 size={6}>
          <Paper variant="outlined" className="p-4">
            <h3>Şəxs haqqında məlumat</h3>
            <Divider style={{ margin: '10px 0' }} />
            <p>Fəaliyyət sektoru : {customerInfo.activityField}</p>
            <p>Aylıq gəlir : {customerInfo.monthlyIncome}</p>
            <p>İş təcrübəsi ( il ) : {customerInfo.yearOfExperience}</p>
            <p>İş təcrübəsi ( ay ) : {customerInfo.monthOfExperience}</p>
            <p>Region : {customerInfo.region}</p>
            <p>Biznes ünvanı : {customerInfo.businessAddress}</p>
          </Paper>
        </Grid2>
        <Grid2 size={6}>
          <Paper variant="outlined" className="p-4">
            <h3>Kredit barədə məlumat</h3>
            <Divider style={{ margin: '10px 0' }} />
            <p>Ümumi məbləğ : {creditInfo.creditAmount}</p>
            <p>Valyuta : {creditInfo.currency}</p>
            <p>Kreditin faizi : {creditInfo.interest}%</p>
            <p>Müddət (ay) : {creditInfo.period}</p>
            <p>
              Biznes kreditin məqsədi : {creditInfo.purposeOfBusinessCredit}
            </p>
          </Paper>
        </Grid2>
        <Grid2 size={6}>
          <Paper variant="outlined" className="p-4">
            <h3>Kredit kalkulyatoru</h3>
            <Divider style={{ margin: '10px 0' }} />
            <p>Məbləğ : {creditCalculator.sumOfTotalAmount}</p>
            <p>Kreditin faizi : {creditInfo.interest}%</p>
            <p>Kreditin müddəti (ay) : {creditInfo.period}</p>
            <p>
              Aylıq məbləğ ( {creditInfo.currency} ) :{' '}
              {(
                Number(creditInfo.creditAmount) / Number(creditInfo.period)
              ).toFixed(2)}
            </p>
            <p>
              Cəm ( AZN ) :{' '}
              {Number(creditInfo.creditAmount) +
                creditCalculator.sumOfTotalAmount}
            </p>
          </Paper>
        </Grid2>
        <Grid2 size={6}>
          <Paper variant="outlined" className="p-4">
            <h3>Zaminlər</h3>
            <Divider style={{ margin: '10px 0' }} />
            {creditGuarantor.map((item, index) => {
              return (
                <Box key={index} sx={{ p: 2, border: '1px dashed grey', m: 1 }}>
                  <p>
                    Ad , soyad və ata adı : {item.firstName} {item.lastName}{' '}
                    {item.patronymic}
                  </p>
                  <p>Doğum tarixi : {item.birthDate}</p>
                  <p>FİN : {item.identityNumber}</p>
                  <p>Seriya nömrəsi : {item.serialNumber}</p>
                </Box>
              );
            })}
          </Paper>
        </Grid2>
        <Grid2 size={12} className="flex justify-end px-4">
          <Box>
            <Button
              color="error"
              variant="contained"
              className="mr-4"
              onClick={() => handleOpenDialog('reject')}
            >
              İmtina et
            </Button>
            <Button
              color="success"
              variant="contained"
              onClick={() => handleOpenDialog('approve')}
            >
              Təsdiq et
            </Button>
          </Box>
        </Grid2>
      </Grid2>

      <ConfirmationDialog
        open={dialogOpen}
        title={
          dialogType === 'approve'
            ? 'Kredit müraciətinin təsdiqi'
            : 'Kredit müraciətinin ləğvi'
        }
        message={
          dialogType === 'approve'
            ? 'Krediti təsdiqləmək istədiyinizə əminsiniz?'
            : 'Zəhmət olmasa, imtina səbəbini qeyd edin.'
        }
        showReasonField={dialogType === 'reject'}
        onConfirm={handleConfirm}
        onClose={() => setDialogOpen(false)}
      />
    </Paper>
  );
};

export default CreditSummary;
