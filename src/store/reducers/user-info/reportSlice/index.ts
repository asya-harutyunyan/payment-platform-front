import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { newRegisteredUsersThunk } from "./thunks";
import { ReportsState } from "./types";

const initialState: ReportsState = {
  loading: false,
  error: null,
  newRegisteredUsers: [],
  currentPage: 0,
  last_page: 0,
  total: 0,
};

const reportsSlice = createSlice({
  name: "deposit",
  initialState,
  reducers: {
    resetDeposit: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(newRegisteredUsersThunk.fulfilled, (state, action) => {
        state.newRegisteredUsers = action.payload.data;
        state.last_page = action.payload.last_page;
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

export default reportsSlice.reducer;
