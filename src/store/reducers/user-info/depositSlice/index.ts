import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  getDepositsThunk,
  getOrdersThunk,
  getSingleDepositThunk,
  getSingleOrderThunk,
  processingAmountThunk,
  updateDeposit,
} from "./thunks";
import { Deposit, DepositState } from "./types";

const initialState: DepositState = {
  loading: false,
  error: null,
  deposit: null,
  deposits: [],
  orders: [],
  currentPage: null,
  lastPage: null,
  total: 0,
  price: 0,
  singleDeposit: [],
};

const depositSlice = createSlice({
  name: "deposit",
  initialState,
  reducers: {
    resetDeposit: () => initialState,
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setNotificationData: (state, action) => {
      state.notificationData = action.payload;
    },
    updateDepositAdminStatus: (state, action: PayloadAction<string>) => {
      state.deposit = {
        ...state.deposit,
        status_by_admin: action.payload,
      } as Deposit;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(processingAmountThunk.fulfilled, (state, action) => {
        state.deposit = action.payload;
      })
      .addCase(updateDeposit.fulfilled, (state, action) => {
        state.deposit = action.payload;
      })
      .addCase(getDepositsThunk.fulfilled, (state, action) => {
        state.deposits = action.payload.data;
        state.lastPage = action.payload.last_page;
        state.total = Math.ceil(action.payload.total / action.payload.per_page);
      })
      .addCase(getSingleDepositThunk.fulfilled, (state, action) => {
        state.singleDeposit = action.payload;
      })
      .addCase(getSingleOrderThunk.fulfilled, (state, action) => {
        state.singleOrder = action.payload;
      })
      .addCase(getOrdersThunk.fulfilled, (state, action) => {
        state.orders = action.payload.data;
        state.lastPage = action.payload.last_page;
        state.total = Math.ceil(action.payload.total / action.payload.per_page);
      })
      .addMatcher(isPending, (state) => {
        state.loading = true;
      })
      .addMatcher(isRejected, (state) => {
        state.loading = false;
      })
      .addMatcher(isFulfilled, (state) => {
        state.loading = false;
      });
  },
});

export const {
  resetDeposit,
  setPrice,
  setNotificationData,
  updateDepositAdminStatus,
} = depositSlice.actions;

export default depositSlice.reducer;
