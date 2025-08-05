import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import {
  getOrderSummaryThunk,
  GetPlatformXThunk,
  getProcessedAmountsThunk,
  getReportUsersThunk,
  getSummaryThunk,
  historyThunk,
  newRegisteredUsersThunk,
  platipayThunk,
} from "./thunks";
import { ReportsState } from "./types";

const initialState: ReportsState = {
  loading: false,
  error: null,
  newRegisteredUsers: [],
  currentPage: 0,
  last_page: 0,
  total: 0,
  platipay: [],
  orders_platformX: [],
  report_users: [],
  singleOrder: [],
  history: [],
  history_last_page: 0,

  admingetProcessedAmounts: {
    payment_method_count: "",
    total_amount: "",
    profits: "",
    crypto_deposits: "",
    card_deposits: "",
    orders_done_amount: "",
    orders_in_progress_amount: "",
  },
  adminSummary: {
    active_cards: 0,
    deposited_amounts: 0,
    not_deposited_yet_amount: 0,
    expiredAmount: 0,
    expiredCount: "",
  },
  orders_stats: {
    total_amount: "",
    total_amount_with_deposit: "",
    total_done_ammount: "",
    order_count: "",
    order_witouth_card_count: "",
    done_order_amount: "",
  },
  orderSummary: {
    active_cards: 0,
    deposited_amounts: 0,
    not_deposited_yet_amount: 0,
    expiredAmount: 0,
    expiredCount: "",
  },
  done_count: "",
  progress_count: "",
  not_gived_count: "",
  expired_count: "",
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
      .addCase(platipayThunk.fulfilled, (state, action) => {
        state.platipay = action.payload.data;
        state.last_page = action.payload.last_page;
        state.total = Math.ceil(action.payload.total / action.payload.per_page);
      })
      .addCase(getReportUsersThunk.fulfilled, (state, action) => {
        state.report_users = action.payload.data;
        state.last_page = action.payload.last_page;
        state.total = Math.ceil(action.payload.total / action.payload.per_page);
      })
      .addCase(getOrderSummaryThunk.fulfilled, (state, action) => {
        state.singleOrder = action.payload;
        state.orderSummary = action.payload;
      })
      .addCase(getSummaryThunk.fulfilled, (state, action) => {
        state.adminSummary = action.payload;
      })
      .addCase(getProcessedAmountsThunk.fulfilled, (state, action) => {
        state.admingetProcessedAmounts = action.payload;
      })

      .addCase(GetPlatformXThunk.fulfilled, (state, action) => {
        state.orders_platformX = action.payload.orders.data;
        state.orders_stats = action.payload.stats;
        state.last_page = action.payload.last_page;
        state.total = Math.ceil(action.payload.total / action.payload.per_page);
      })

      .addCase(historyThunk.fulfilled, (state, action) => {
        state.history = action.payload.data.data;
        state.history_last_page = action.payload.last_page;
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
