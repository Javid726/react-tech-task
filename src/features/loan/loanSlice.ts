import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ICustomerState } from '../../types/customerTypes';
import {
  CustomerCreditInfo,
  ICustomerInfo,
  ICreditInfo,
} from '../../types/loanTypes';

const initialState: CustomerCreditInfo = {
  customerId: '',
  customerInfo: {
    activityField: '',
    monthlyIncome: '',
    yearOfExperience: '',
    monthOfExperience: '',
    region: '',
    businessAddress: '',
  },
  creditInfo: {
    currency: '',
    purposeOfBusinessCredit: '',
    creditAmount: '',
    period: '',
    interest: '',
  },
  creditGuarantor: [],
  creditCalculator: {
    sumOfTotalAmount: 0,
  },
  loading: false,
  error: null,
};

export const addGuarantors = createAsyncThunk(
  'loan/addGuarantors',
  async (guarantors: ICustomerState[], { rejectWithValue }) => {
    try {
      // we can make an API call here
      // const response = await api.addGuarantors(guarantors);
      // return response.data;

      return guarantors;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to add guarantors');
    }
  },
);

export const removeGuarantorAsync = createAsyncThunk(
  'loan/removeGuarantor',
  async (guarantorId: string, { rejectWithValue }) => {
    try {
      // we can make an API call here
      // await api.removeGuarantor(guarantorId);

      return guarantorId;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to remove guarantor');
    }
  },
);

const loanSlice = createSlice({
  name: 'loan',
  initialState,
  reducers: {
    setCustomerId(state, action: PayloadAction<string>) {
      state.customerId = action.payload;
    },
    updateCustomerInfo(state, action: PayloadAction<Partial<ICustomerInfo>>) {
      state.customerInfo = { ...state.customerInfo, ...action.payload };
    },
    updateCreditInfo(state, action: PayloadAction<Partial<ICreditInfo>>) {
      state.creditInfo = { ...state.creditInfo, ...action.payload };
    },
    updateCreditStatus(
      state,
      action: PayloadAction<{ status: string; rejectionReason?: string }>,
    ) {
      state.creditInfo.status = action.payload.status;
      state.creditInfo.rejectionReason = action.payload.rejectionReason || '';
    },
    resetState() {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addGuarantors.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addGuarantors.fulfilled, (state, action) => {
        state.loading = false;
        state.creditGuarantor = action.payload;
        state.error = null;
      })
      .addCase(addGuarantors.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to add guarantors';
      })
      .addCase(removeGuarantorAsync.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeGuarantorAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.creditGuarantor = state.creditGuarantor.filter(
          guarantor => guarantor.id !== action.payload,
        );
        state.error = null;
      })
      .addCase(removeGuarantorAsync.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || 'Failed to remove guarantor';
      });
  },
});

export const {
  setCustomerId,
  updateCustomerInfo,
  updateCreditInfo,
  resetState,
} = loanSlice.actions;

export default loanSlice.reducer;
