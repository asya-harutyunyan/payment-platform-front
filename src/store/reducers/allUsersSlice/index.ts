import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import {
  createSystemConfigThunk,
  getBankNamesThunk,
  getBlockedUsersThunk,
  getFreezedUsersThunk,
  getFreezeUserThunk,
  getReferalsUserThunk,
  getReferedUsersListThunk,
  getReferredUsersForAdminThunk,
  getSystemConfigThunk,
  getUsersThunk,
  getUserThunk,
  updatePercentThunk,
  updateSystemConfigThunk,
} from "./thunks";
import { UserState } from "./types";

const initialState: UserState = {
  loading: false,
  error: null,
  users: [],
  blockedUsers: [],
  user: null,
  freezedUser: null,
  freezedUsers: [],
  currentPage: null,
  lastPage: null,
  total: 0,
  banks: [],
  referralUser: [],
  referralUsersForAdmin: [],
  referred_users_list: [],
  lastPageRefList: 0,
  referralUsersForAdminPagination: {
    current_page: 0,
    last_page: 0,
    per_page: 0,
    total: 0,
  },
  amount_to_pay: "",
  total_amount: "",
  systemConfigState: {},
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
      .addCase(getFreezedUsersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.freezedUsers = action.payload.data;
        state.lastPage = action.payload.last_page;
        state.total = Math.ceil(action.payload.total / action.payload.per_page);
      })
      .addCase(getBlockedUsersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.blockedUsers = action.payload.data;
        state.lastPage = action.payload.last_page;
        state.total = Math.ceil(action.payload.total / action.payload.per_page);
      })
      .addCase(updatePercentThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getBankNamesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.banks = action.payload;
      })
      .addCase(getReferalsUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.referralUser = action.payload.referred_users;
        state.total_amount = action.payload.total_amount;
        state.amount_to_pay = action.payload.amount_to_pay;
        state.lastPage = action.payload.last_page;
        state.total = Math.ceil(action.payload.total / action.payload.per_page);
      })
      .addCase(getReferredUsersForAdminThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.referralUsersForAdmin = action.payload.referral_stats;
        state.referralUsersForAdminPagination = action.payload.pagination;
        state.lastPage = action.payload.pagination.last_page;
        state.total = Math.ceil(
          action.payload.pagination.lastPage /
            action.payload.pagination.per_page
        );
      })
      .addCase(getReferedUsersListThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.referred_users_list = action.payload.referred_users;
        state.lastPageRefList = action.payload.pagination.last_page;
        state.total = Math.ceil(
          action.payload.pagination.lastPage /
            action.payload.pagination.per_page
        );
      })

      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getFreezeUserThunk.fulfilled, (state, action) => {
        state.freezedUser = action.payload.user;
      })
      .addCase(getSystemConfigThunk.pending, (state) => {
        state.systemConfigState.loading = true;
      })
      .addCase(getSystemConfigThunk.fulfilled, (state, { payload }) => {
        state.systemConfigState.data = payload;
        state.systemConfigState.loading = false;
      })
      .addCase(getSystemConfigThunk.rejected, (state) => {
        state.systemConfigState.loading = false;
      })
      .addCase(createSystemConfigThunk.pending, (state) => {
        state.systemConfigState.loading = true;
      })
      .addCase(createSystemConfigThunk.fulfilled, (state, { payload }) => {
        state.systemConfigState.data = {
          config: payload.config_data,
          ...payload,
        };
        state.systemConfigState.loading = false;
      })
      .addCase(createSystemConfigThunk.rejected, (state) => {
        state.systemConfigState.loading = false;
      })
      .addCase(updateSystemConfigThunk.pending, (state) => {
        state.systemConfigState.loading = true;
      })
      .addCase(updateSystemConfigThunk.fulfilled, (state, { payload }) => {
        state.systemConfigState.data = {
          config: payload.config_data,
          ...payload,
        };
        state.systemConfigState.loading = false;
      })
      .addCase(updateSystemConfigThunk.rejected, (state) => {
        state.systemConfigState.loading = false;
      })
      .addMatcher(isFulfilled, (state) => {
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

export default usersSlice.reducer;
