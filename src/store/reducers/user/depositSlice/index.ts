import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { processingAmount, updateDeposit } from "./thunks";
import { DepositState } from "./types";

const initialState: DepositState = {
  loading: false,
  error: null,
  deposit: null,
};

const depositSlice = createSlice({
  name: "deposit",
  initialState,
  reducers: {
    resetDeposit: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(processingAmount.fulfilled, (state, action) => {
        state.loading = false;
        state.deposit = action.payload;
      })
      .addCase(updateDeposit.fulfilled, (state, action) => {
        state.loading = false;
        state.deposit = action.payload;
      })
      .addMatcher(isPending, (state) => {
        state.loading = true;
      })
      .addMatcher(isRejected, (state) => {
        state.loading = false;
      });
  },
});

export const { resetDeposit } = depositSlice.actions;

export default depositSlice.reducer;
