import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  getBankNamesThunk,
  getReferalsUserThunk,
  getReferredUsersForAdminThunk,
  getUsersThunk,
  getUserThunk,
} from "./thunks";
import { UserState } from "./types";

const initialState: UserState = {
  loading: false,
  error: null,
  users: [],
  user: null,
  currentPage: null,
  lastPage: null,
  total: 0,
  banks: [],
  referralUser: [],
  referralUsersForAdmin: [],
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
      .addCase(getReferalsUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.referralUser = action.payload.referred_users;
        state.lastPage = action.payload.last_page;
        state.total = Math.ceil(action.payload.total / action.payload.per_page);
      })
      .addCase(getReferredUsersForAdminThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.referralUsersForAdmin = action.payload.referral_stats;
        state.lastPage = action.payload.last_page;
        state.total = Math.ceil(action.payload.total / action.payload.per_page);
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
