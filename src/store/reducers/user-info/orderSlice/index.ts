import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import {
  getDeletedOrdersThunk,
  getOrdersThunk,
  getSingleOrderThunk,
  getUserOrdersThunk,
} from "./thunks";
import { OrderState } from "./types";

const initialState: OrderState = {
  loading: false,
  error: null,
  singleOrder: {
    id: 0,
    wallet_id: 0,
    user_id: 0,
    deposit_id: 0,
    amount: "",
    status_by_client: "",
    status_by_admin: "",
    created_at: "",
    updated_at: "",
    name: "",
    surname: "",
    initial_ammount: 0,
  },
  ordersUser: [],
  orders: [],
  currentPage: null,
  lastPage: null,
  total: 0,
  price: 0,
  order: [],
  deletedOrders: [],
};

const depositSlice = createSlice({
  name: "deposit",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersThunk.fulfilled, (state, action) => {
        state.orders = action.payload.data;
        state.lastPage = action.payload.last_page;
        state.total = Math.ceil(action.payload.total / action.payload.per_page);
      })
      .addCase(getDeletedOrdersThunk.fulfilled, (state, action) => {
        state.deletedOrders = action.payload.deleted_orders;
        state.lastPage = action.payload.last_page;
        state.total = Math.ceil(action.payload.total / action.payload.per_page);
      })
      .addCase(getUserOrdersThunk.fulfilled, (state, action) => {
        state.ordersUser = action.payload.data;
        state.lastPage = action.payload.pagination.last_page;
        state.total = Math.ceil(
          action.payload.pagination.total / action.payload.pagination.per_page
        );
      })
      .addCase(getSingleOrderThunk.fulfilled, (state, action) => {
        state.singleOrder = action.payload;
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

export default depositSlice.reducer;
