import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  getDepositsThunk,
  getOrdersThunk,
  getSingleDepositThunk,
  getSingleOrderThunk,
  processingAmountThunk,
  updateDeposit,
} from "./thunks";
import { DepositState } from "./types";

const initialState: DepositState = {
  loading: false,
  error: null,
  deposit: null,
  deposits: [],
  orders: [],
  currentPage: null,
  lastPage: null,
  per_page: 5,
  total: 0,
  price: 0,
  singleDeposit: [],
  singleOrder: [],
};

const depositSlice = createSlice({
  name: "deposit",
  initialState,
  reducers: {
    resetDeposit: () => initialState,
    setPrice: (state, action) => {
      state.price = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(processingAmountThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.deposit = action.payload;
      })
      .addCase(updateDeposit.fulfilled, (state, action) => {
        state.loading = false;
        state.deposit = action.payload;
      })
      .addCase(getDepositsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.deposits = action.payload.data;
        state.lastPage = action.payload.last_page;
        state.total = parseFloat(
          (action.payload.total / action.payload.per_page).toFixed()
        );
      })
      .addCase(getSingleDepositThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.singleDeposit = action.payload;
      })
      .addCase(getSingleOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.singleOrder = action.payload;
      })
      .addCase(getOrdersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.data;
        state.lastPage = action.payload.last_page;
        state.total = parseFloat(
          (action.payload.total / action.payload.per_page).toFixed()
        );
      })
      .addMatcher(isPending, (state) => {
        state.loading = true;
      })
      .addMatcher(isRejected, (state) => {
        state.loading = false;
      });
  },
});

export const { resetDeposit, setPrice } = depositSlice.actions;

export default depositSlice.reducer;
