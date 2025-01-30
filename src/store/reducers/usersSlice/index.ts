import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { getUsersThunk, getUserThunk } from "./thunks";
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
        state.total = action.payload.total;
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
