import { httpClient } from "@/common/api";
import { DEPOSIT_STATUSES } from "@/enum/deposit.status.enum";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Pagination } from "../walletSlice/types";
import { OrderRequest } from "./types";

//order
export const getOrdersThunk = createAsyncThunk(
  "orders/getOrdersThunk",
  async (data: OrderRequest, { rejectWithValue }) => {
    try {
      const response = await httpClient.get("/orders/status", {
        params: {
          page: data.page,
          per_page: data.per_page,
          status_by_client:
            data.status_by_client === DEPOSIT_STATUSES.ALL
              ? undefined
              : data.status_by_client,
          name: data.name,
          surname: data.surname,
          amount: data.amount,
          status_by_admin: data.status_by_admin,
          status_client: data.status_client,
          sort: data.sort,
          card_number: data.card_number,
          from: data.from,
          to: data.to,
          transaction_id: data.transaction_id,
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Something went wrong"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);
//user
export const getUserOrdersThunk = createAsyncThunk(
  "orders/getUserOrdersThunk",
  async (data: OrderRequest, { rejectWithValue }) => {
    try {
      const response = await httpClient.get("/orders", {
        params: {
          page: data.page,
          per_page: data.per_page,
          status_by_client:
            data.status_by_client === DEPOSIT_STATUSES.ALL
              ? undefined
              : data.status_by_client,
          name: data.name,
          surname: data.surname,
          amount: data.amount,
          status_by_admin: data.status_by_admin,
          sort: data.sort,
          card_number: data.card_number,
          month: data.month,
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Something went wrong"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

export const getOrdersWithStatusThunk = createAsyncThunk(
  "orders/getOrdersWithStatusThunk",
  async (data: Pagination, { rejectWithValue }) => {
    try {
      const response = await httpClient.get("/orders/status", {
        params: {
          page: data.page,
          per_page: data.per_page,
          status_by_client:
            data.status_by_client === DEPOSIT_STATUSES.ALL
              ? undefined
              : data.status_by_client,
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Something went wrong"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);
export const deleteOrderThunk = createAsyncThunk(
  "orders/deleteOrderThunk",
  async (id: number | string, { rejectWithValue }) => {
    try {
      const response = await httpClient.delete(`/orders/delete/${id}`);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Something went wrong"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

export const getSingleOrderThunk = createAsyncThunk(
  "orders/getSingleOrderThunk",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await httpClient.get(`/orders/${id}`);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Something went wrong"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

export const confirmOrderByAdminThunk = createAsyncThunk(
  "orders/confirmOrderByAdminThunk",
  async (order_id: string | number, { rejectWithValue }) => {
    try {
      const response = await httpClient.post(
        `/orders/confirm/admin/${order_id}`
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Something went wrong"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

export const changeStatusDoneOrderThunk = createAsyncThunk(
  "orders/changeStatusDoneOrderThunk",
  async (id: string | number, { rejectWithValue }) => {
    try {
      const response = await httpClient.put(`/orders/status/${id}`, {
        status_by_client: "done",
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Something went wrong"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

export const confirmOrderByClientThunk = createAsyncThunk(
  "orders/confirmOrderByClientThunk",
  async (order_id: string | number, { rejectWithValue }) => {
    try {
      const response = await httpClient.post(
        `/orders/confirm/client/${order_id}`
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Something went wrong"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

export const getDeletedOrdersThunk = createAsyncThunk(
  "orders/getDeletedOrdersThunk",
  async (data: Pagination, { rejectWithValue }) => {
    try {
      const response = await httpClient.get(`/orders/admin/deleted-orders`, {
        params: {
          page: data.page,
          per_page: data.per_page,
          name: data.name,
          surname: data.surname,
          transaction_id: data.transaction_id,
          status_by_client: data.status_by_client,
          amount: data.amount,
          card_number: data.card_number,
          from: data.from,
          to: data.to,
          sort: data.sort,
        },
      });

      return response.data.deleted_orders;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Something went wrong"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);
