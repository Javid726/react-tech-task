import { Paper, Box, Button, Grid2 } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState, useMemo } from 'react';
import { RootState } from '../../../store/store';
import { useSelector } from 'react-redux';
import {
  calculateOverallCreditAmount,
  generatePaymentSchedule,
} from '../../../utils/loanCalculations';

type PaymentScheduleRow = {
  id: number;
  month: number;
  monthlyPayment: number;
  principal: number;
  interest: number;
  balance: number;
};

type LoanCalculatorProps = {
  onNext: () => void;
  onBack: () => void;
};

const LoanCalculator = ({ onNext, onBack }: LoanCalculatorProps) => {
  const [paymentSchedule, setPaymentSchedule] = useState<PaymentScheduleRow[]>(
    [],
  );
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);

  const creditInfo = useSelector((state: RootState) => state.loan.creditInfo);
  const { creditAmount, period, interest, currency } = creditInfo;

  const overallCreditAmount = calculateOverallCreditAmount(
    Number(creditAmount),
    Number(interest),
    Number(period),
  );

  const calculateLoan = () => {
    const { monthlyPayment, schedule } = generatePaymentSchedule(
      Number(creditAmount),
      Number(interest),
      Number(period),
    );
    setMonthlyPayment(monthlyPayment);
    setPaymentSchedule(schedule);
  };

  const columns: GridColDef<PaymentScheduleRow>[] = [
    {
      field: 'month',
      headerName: 'Ay',
      width: 150,
    },
    {
      field: 'monthlyPayment',
      headerName: 'Aylıq ödəniş',
      width: 200,
      valueFormatter: (value, row) =>
        `${row.monthlyPayment.toFixed(2)} ${currency}`,
    },
    {
      field: 'principal',
      headerName: 'Əsas məbləğ',
      width: 200,
      valueFormatter: (value, row) => `${row.principal.toFixed(2)} ${currency}`,
    },
    {
      field: 'interest',
      headerName: 'Faiz',
      width: 200,
      valueFormatter: (value, row) => `${row.interest.toFixed(2)} ${currency}`,
    },
    {
      field: 'balance',
      headerName: 'Qalıq balans',
      width: 200,
      valueFormatter: (value, row) => `${row.balance.toFixed(2)} ${currency}`,
    },
  ];

  return (
    <Paper sx={{ padding: 2 }} className="flex flex-col">
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Button variant="contained" onClick={calculateLoan}>
          Calculate Loan
        </Button>
      </Box>
      <Grid2 container spacing={2}>
        <Grid2 size={4}>
          <Paper className="h-full p-4">
            <Box>
              Credit amount: {overallCreditAmount} {currency}
            </Box>
            <Box>
              Monthly payment: {monthlyPayment?.toFixed(2)} {currency}
            </Box>
          </Paper>
        </Grid2>
        <Grid2 size={8}>
          <DataGrid
            rows={paymentSchedule}
            columns={columns}
            autoHeight={false}
            pageSizeOptions={[5, 10]}
            sx={{
              height: 400,
              '& .MuiDataGrid-columnHeaders': {
                position: 'sticky',
                top: 0,
                zIndex: 1,
                backgroundColor: 'white',
              },
            }}
          />
        </Grid2>
      </Grid2>
      <Box className="self-end mt-3">
        <Button
          type="button"
          variant="outlined"
          onClick={onBack}
          className="mr-4 px-4"
        >
          Geri
        </Button>
        <Button type="button" variant="contained" onClick={onNext}>
          Növbəti
        </Button>
      </Box>
    </Paper>
  );
};

export default LoanCalculator;
