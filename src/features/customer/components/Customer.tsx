import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Paper } from '@mui/material';
import { useMemo } from 'react';
import Header from '../../../components/Header';
import SearchToolbar from './SearchToolbar';
import NoDataOverlay from './NoDataOverlay';
import { useState } from 'react';
import AddCustomer from './AddCustomer';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ICustomerState } from '../../../types/customerTypes';

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

const Customer = () => {
  const columns: GridColDef<ICustomerState>[] = [
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
    {
      field: 'actions',
      headerName: 'Actions',
      width: 180,
      sortable: false,
      renderCell: params => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleCreateLoan(params.row)}
        >
          Kredit müraciəti
        </Button>
      ),
    },
  ];

  const actualColumns = useMemo(
    () => columns.filter(column => VISIBLE_FIELDS.includes(column.field)),
    [columns],
  );
  const [open, setOpen] = useState(false);
  const customers = useSelector((state: RootState) => state.customer);
  const navigate = useNavigate();

  const handleCreateLoan = (row: any) => {
    navigate('/credit', { state: { customer: row } });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleGetRowId = (row: any) => row.identityNumber;

  return (
    <>
      <Header />
      <Paper sx={{ height: '80vh', marginTop: '10px' }}>
        <DataGrid
          rows={customers.customers}
          getRowId={handleGetRowId}
          columns={actualColumns}
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
          slots={{
            toolbar: SearchToolbar,
            noRowsOverlay: () => <NoDataOverlay handleOpen={handleClickOpen} />,
            noResultsOverlay: () => (
              <NoDataOverlay handleOpen={handleClickOpen} />
            ),
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
        />
        <AddCustomer handleClose={handleClose} open={open} />
      </Paper>
    </>
  );
};

export default Customer;
