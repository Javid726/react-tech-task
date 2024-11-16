import { Paper, Box, Button } from '@mui/material';
import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { addGuarantors } from '../loanSlice';
import SearchToolbar from '../../customer/components/SearchToolbar';
import NoDataOverlay from '../../customer/components/NoDataOverlay';
import AddCustomer from '../../customer/components/AddCustomer';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { ICustomerState } from '../../../types/customerTypes';
import { useAppDispatch } from '../../../store/store';
import { useForm } from 'react-hook-form';

const VISIBLE_FIELDS = [
  'identityNumber',
  'serialNumber',
  'fullname',
  'registrationAddress',
  'birthDate',
  'phoneNumber',
  'actualAddress',
  'actions',
];

type CreditGuarantorsProps = {
  onNext: () => void;
  onBack: () => void;
};

const CreditGuarantors = ({ onNext, onBack }: CreditGuarantorsProps) => {
  const columns: GridColDef<(typeof customers)[number]>[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'identityNumber',
      headerName: 'FİN',
      width: 120,
    },
    {
      field: 'serialNumber',
      headerName: 'Seriya',
      width: 120,
    },
    {
      field: 'fullname',
      headerName: 'Ad Soyad Ata adı',
      width: 220,
      valueGetter: (value, row) =>
        `${row.firstName || ''} ${row.lastName || ''} ${row.patronymic || ''}`,
    },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: true,
    },
    {
      field: 'registrationAddress',
      headerName: 'Qeydiyyat ünvanı',
      width: 220,
    },
    {
      field: 'birthDate',
      headerName: 'Doğum tarixi',
      width: 160,
    },
    {
      field: 'phoneNumber',
      headerName: 'Telefon (mobil + ev)',
      width: 160,
    },
    {
      field: 'actualAddress',
      headerName: 'Faktiki ünvan',
      width: 200,
    },
  ];

  const actualColumns = useMemo(
    () => columns.filter(column => VISIBLE_FIELDS.includes(column.field)),
    [columns],
  );

  const {
    formState: { errors },
  } = useForm<ICustomerState>();

  const [selectedGuarantors, setSelectedGuarantors] =
    useState<GridRowSelectionModel>([]);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);

  const guarantors = useSelector(
    (state: RootState) => state.loan.creditGuarantor,
  );
  const customers = useSelector((state: RootState) => state.customer.customers);

  const dispatch = useAppDispatch();

  const handleSelectionChange = (selection: GridRowSelectionModel) => {
    setSelectedGuarantors(selection);
    setError(false);
  };

  const handleNext = async () => {
    if (selectedGuarantors.length === 0 && guarantors.length === 0) {
      setError(true);
      return;
    }

    if (selectedGuarantors.length > 0) {
      const selectedGuarantorsData = customers.filter(customer =>
        selectedGuarantors.includes(customer.identityNumber),
      );

      try {
        await dispatch(addGuarantors(selectedGuarantorsData)).unwrap();
        setSelectedGuarantors([]);
        setError(false);
        onNext();
      } catch (err) {
        setError(true);
        console.error('Failed to add guarantors:', err);
      }
    } else {
      onNext();
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleGetRowId = (row: any) => row.identityNumber;
  return (
    <Paper sx={{ height: '80vh', marginTop: '10px' }}>
      <form className="flex flex-col h-4/5">
        <DataGrid
          rows={customers}
          getRowId={handleGetRowId}
          columns={actualColumns}
          onRowSelectionModelChange={handleSelectionChange}
          rowSelectionModel={selectedGuarantors}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
          disableColumnFilter
          disableColumnSelector
          disableColumnMenu
          disableDensitySelector
          checkboxSelection
          slots={{
            toolbar: SearchToolbar,
            noRowsOverlay: () => (
              <NoDataOverlay
                handleOpen={handleClickOpen}
                buttonLabel="Zamin əlavə edin"
              />
            ),
            noResultsOverlay: () => (
              <NoDataOverlay
                handleOpen={handleClickOpen}
                buttonLabel="Zamin əlavə edin"
              />
            ),
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
        />
        {error && (
          <Box color="red" textAlign="center" mt={2}>
            Zamin əlavə etmək lazımdır!
          </Box>
        )}
        <AddCustomer handleClose={handleClose} open={open} />
        <Box className="self-end mt-5 mr-4">
          <Button
            type="button"
            variant="outlined"
            onClick={onBack}
            className="mr-4 px-4"
          >
            Geri
          </Button>
          <Button type="button" variant="contained" onClick={handleNext}>
            Növbəti
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default CreditGuarantors;
