import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ICustomerState, ICustomerSliceState } from '../../types/customerTypes';

export const getCustomers = createAsyncThunk(
  'customerSlice/getCustomers',
  async () => {
    // fetch customer data from an API or database.

    return [];
  },
);

const initialState: ICustomerSliceState = {
  customers: [],
  loading: 'idle',
};

export const customerSlice = createSlice({
  name: 'customerSlice',
  initialState,
  reducers: {
    addCustomer: (state, action: PayloadAction<ICustomerState>) => {
      state.customers.push(action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(getCustomers.pending, state => {
      state.loading = 'pending';
    });
    builder.addCase(
      getCustomers.fulfilled,
      (state, action: PayloadAction<ICustomerState[]>) => {
        state.loading = 'succeeded';
        state.customers = action.payload;
      },
    );
    builder.addCase(getCustomers.rejected, state => {
      state.loading = 'failed';
    });
  },
});

export const { addCustomer } = customerSlice.actions;
export default customerSlice.reducer;
