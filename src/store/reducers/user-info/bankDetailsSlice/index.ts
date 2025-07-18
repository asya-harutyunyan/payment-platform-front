import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  addBankCardThunk,
  deleteBankCardThunk,
  editBankCardThunk,
  getBankCardsThunk,
  getBlockedCardsThunk,
  getCardsThunk,
} from "./thunks";
import { DepositState } from "./types";

const initialState: DepositState = {
  loading: false,
  error: null,
  bankCards: [],
  blockedCards: [],
  total: 0,
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
      .addCase(getBankCardsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.bankCards = action.payload.data;

        state.total = action.payload.pagination.last_page;
      })
      .addCase(getBlockedCardsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.blockedCards = action.payload.data;
        state.total = action.payload.last_page;
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
