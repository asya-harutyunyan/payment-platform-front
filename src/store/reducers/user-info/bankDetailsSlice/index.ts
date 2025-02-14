import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { DepositState } from "../addCard/types";
import {
  addBankCardThunk,
  deleteBankCardThunk,
  editBankCardThunk,
  getCardsThunk,
} from "./thunks";

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
      .addCase(getCardsThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editBankCardThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteBankCardThunk.fulfilled, (state) => {
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
