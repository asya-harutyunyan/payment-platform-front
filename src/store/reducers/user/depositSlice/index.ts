import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { DepositState } from "./types";
import { processingAmount } from "./thunks";

const initialState: DepositState = {
  loading: false,
  error: null,
  email: "",
};

const depositSlice = createSlice({
  name: "deposit",
  initialState,
  reducers: {
    // setEmail: (state, action) => {
    //   state.email = action.payload;
    // },
  },
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
// export const { setEmail } = depositSlice.actions;

export default depositSlice.reducer;
