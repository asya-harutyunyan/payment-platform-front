import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { processingAmount } from "./thunks";
import { DepositState } from "./types";

const initialState: DepositState = {
  loading: false,
  error: null,
  email: "",
};

const bankDetalisSlice = createSlice({
  name: "deposit",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(processingAmount.fulfilled, (state) => {
        state.loading = false;
      })
      .addMatcher(isPending, (state) => {
        state.loading = true;
      })
      .addMatcher(isRejected, (state) => {
        state.loading = false;
      });
  },
});

export default bankDetalisSlice.reducer;
