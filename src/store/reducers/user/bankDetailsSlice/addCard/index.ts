import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { addBankCardThunk } from "./thunks";
import { DepositState } from "./types";

const initialState: DepositState = {
  loading: false,
  error: null,
};

const bankDetailsSlice = createSlice({
  name: "bankDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addBankCardThunk.fulfilled, (state) => {
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

export default bankDetailsSlice.reducer;
