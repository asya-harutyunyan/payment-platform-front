import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  createDepositThunk,
  getDepositsAdminThunk,
  getDepositsThunk,
  getSingleDepositThunk,
  updateDeposit,
} from "./thunks";
import { Deposit, DepositState } from "./types";

const initialState: DepositState = {
  loading: false,
  error: null,
  deposit: null,
  deposits: [],
  depositsAdmin: [],
  orders: [],
  currentPage: null,
  pagination: {
    current_page: 0,
    last_page: 0,
    per_page: 0,
    total: 0,
  },
  total: 0,
  price: 0,
  singleDeposit: [],
  lastPage: 0,
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
      .addCase(createDepositThunk.fulfilled, (state, action) => {
        state.deposit = action.payload;
      })
      .addCase(updateDeposit.fulfilled, (state, action) => {
        state.deposit = action.payload;
      })
      .addCase(getDepositsThunk.fulfilled, (state, action) => {
        state.deposits = action.payload.data;
        state.pagination.total = action.payload.pagination.total;
        state.pagination.last_page = Math.ceil(
          action.payload.pagination.last_page /
            action.payload.pagination.per_page
        );
      })
      .addCase(getDepositsAdminThunk.fulfilled, (state, action) => {
        state.depositsAdmin = action.payload.data;
        console.log(action.payload);
        // state.pagination.total = action.payload.pagination.total;
        // state.pagination.last_page = Math.ceil(
        //   action.payload.pagination.last_page /
        //     action.payload.pagination.per_page
        // );
      })

      .addCase(getSingleDepositThunk.fulfilled, (state, action) => {
        state.singleDeposit = action.payload;
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
