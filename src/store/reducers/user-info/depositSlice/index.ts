import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  getDepositsThunk,
  getOrdersThunk,
  getOrderSummaryThunk,
  GetPlatformXThunk,
  getReportUsersThunk,
  getSingleDepositThunk,
  getSingleOrderThunk,
  getSummaryThunk,
  platipayThunk,
  processingAmountThunk,
  updateDeposit,
} from "./thunks";
import { Deposit, DepositState } from "./types";

const initialState: DepositState = {
  loading: false,
  error: null,
  deposit: null,
  deposits: [],
  orders: [],
  currentPage: null,
  lastPage: null,
  total: 0,
  price: 0,
  singleDeposit: [],
  platipay: [],
  orders_platformX: [],
  report_users: [],
  adminSummary: {
    active_cards: 0,
    deposited_amounts: 0,
    not_deposited_yet_amount: 0,
    expiredAmount: 0,
  },
  orders_stats: {
    total_amount: "",
    total_amount_with_deposit: "",
    total_done_ammount: "",
    order_count: "",
    donee_order_ammount: "",
    order_witouth_card_count: "",
  },
  orderSummary: {
    active_cards: 0,
    deposited_amounts: 0,
    not_deposited_yet_amount: 0,
    expiredAmount: 0,
  },
};

const depositSlice = createSlice({
  name: "deposit",
  initialState,
  reducers: {
    resetDeposit: () => initialState,
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setNotificationData: (state, action) => {
      state.notificationData = action.payload;
    },
    updateDepositAdminStatus: (state, action: PayloadAction<string>) => {
      state.deposit = {
        ...state.deposit,
        status_by_admin: action.payload,
      } as Deposit;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(processingAmountThunk.fulfilled, (state, action) => {
        state.deposit = action.payload;
      })
      .addCase(updateDeposit.fulfilled, (state, action) => {
        state.deposit = action.payload;
      })
      .addCase(getDepositsThunk.fulfilled, (state, action) => {
        state.deposits = action.payload.data;
        state.lastPage = action.payload.last_page;
        state.total = Math.ceil(action.payload.total / action.payload.per_page);
      })
      .addCase(platipayThunk.fulfilled, (state, action) => {
        state.platipay = action.payload.data;
        state.lastPage = action.payload.last_page;
        state.total = Math.ceil(action.payload.total / action.payload.per_page);
      })
      .addCase(getSummaryThunk.fulfilled, (state, action) => {
        state.adminSummary = action.payload;
      })
      .addCase(GetPlatformXThunk.fulfilled, (state, action) => {
        state.orders_platformX = action.payload.orders.data;
        state.orders_stats = action.payload.stats;
        state.lastPage = action.payload.last_page;
        state.total = Math.ceil(action.payload.total / action.payload.per_page);
      })
      .addCase(getSingleDepositThunk.fulfilled, (state, action) => {
        state.singleDeposit = action.payload;
      })
      .addCase(getSingleOrderThunk.fulfilled, (state, action) => {
        state.singleOrder = action.payload;
      })
      .addCase(getOrderSummaryThunk.fulfilled, (state, action) => {
        state.singleOrder = action.payload;
        state.orderSummary = action.payload;
      })
      .addCase(getOrdersThunk.fulfilled, (state, action) => {
        state.orders = action.payload.data;
        state.lastPage = action.payload.last_page;
        state.total = Math.ceil(action.payload.total / action.payload.per_page);
      })
      .addCase(getReportUsersThunk.fulfilled, (state, action) => {
        state.report_users = action.payload;
        state.lastPage = action.payload.last_page;
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

export const {
  resetDeposit,
  setPrice,
  setNotificationData,
  updateDepositAdminStatus,
} = depositSlice.actions;

export default depositSlice.reducer;
