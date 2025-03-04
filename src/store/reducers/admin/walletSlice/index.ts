import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { createWalletsThunk, getWalletsThunk } from "./thunks";
import { WalletState } from "./types";

const initialState: WalletState = {
  loading: false,
  error: null,
  wallet: [],
  currentPage: null,
  lastPage: null,
  total: 0,
};

const WalletsSlice = createSlice({
  name: "wallets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createWalletsThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getWalletsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.wallet = action.payload.data;
        state.lastPage = action.payload.last_page;
        state.total = Math.ceil(action.payload.total / action.payload.per_page);
      })
      .addMatcher(isPending, (state) => {
        state.loading = true;
      })
      .addMatcher(isRejected, (state) => {
        state.loading = false;
      });
  },
});

export default WalletsSlice.reducer;
