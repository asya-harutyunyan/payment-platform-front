import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { getBankNamesThunk, getUsersThunk, getUserThunk } from "./thunks";
import { UserState } from "./types";

const initialState: UserState = {
  loading: false,
  error: null,
  users: [],
  user: null,
  currentPage: null,
  lastPage: null,
  per_page: 5,
  total: 0,
  banks: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
        state.lastPage = action.payload.last_page;
        state.total = Math.ceil(action.payload.total / action.payload.per_page);
      })
      .addCase(getBankNamesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.banks = action.payload;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addMatcher(isPending, (state) => {
        state.loading = true;
      })
      .addMatcher(isRejected, (state) => {
        state.loading = false;
      });
  },
});

export default usersSlice.reducer;
