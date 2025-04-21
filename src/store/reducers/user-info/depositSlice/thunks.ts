import { httpClient } from "@/common/api";
import { DEPOSIT_STATUSES } from "@/enum/deposit.status.enum";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AppState } from "../../..";
import {
  GetPlatformXRequest,
  GetWalletRequest,
} from "../../admin/walletSlice/types";
import { AmountType, Deposit, WalletDetalisType } from "./types";
//first step
export const processingAmountThunk = createAsyncThunk(
  "deposit/processingAmount",
  async (amount: AmountType | undefined, { rejectWithValue }) => {
    try {
      const response = await httpClient.post<Deposit>(
        "/deposits/create",
        amount
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
//third step
export const confirmDepositByUserThunk = createAsyncThunk(
  "deposit/confirmDepositByUser",
  async (data: WalletDetalisType, { rejectWithValue }) => {
    try {
      const response = await httpClient.post(
        `/deposits/confirm/client/${data.deposit_id}`,
        {
          transaction_id: data.transaction_id,
        }
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

export const confirmDepositByAdminThunk = createAsyncThunk(
  "deposit/confirmDepositByAdminThunk",
  async (deposit_id: AmountType, { rejectWithValue }) => {
    try {
      const response = await httpClient.post(
        "/deposits/confirm/admin",
        deposit_id
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

export const updateDeposit = createAsyncThunk(
  "deposit/updateDeposit",
  async (data: Partial<Deposit>, { rejectWithValue, getState }) => {
    try {
      const { id, ...formData } = data;
      const {
        deposit: { deposit },
      } = getState() as AppState;
      const response = await httpClient.post<Deposit>(
        `/deposits/update/${id ?? deposit?.id}`,
        formData
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

export const getDepositsThunk = createAsyncThunk(
  "deposit/getDepositsThunk",
  async (data: GetWalletRequest, { rejectWithValue }) => {
    try {
      const response = await httpClient.get(`/deposits`, {
        params: {
          page: data.page,
          per_page: data.per_page,
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
export const getSingleDepositThunk = createAsyncThunk(
  "deposit/getSingleDepositThunk",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await httpClient.get(`/deposits/${id}`);
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
export const getOrdersThunk = createAsyncThunk(
  "deposit/getOrdersThunk",
  async (data: GetWalletRequest, { rejectWithValue }) => {
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

export const getOrdersStatusThunk = createAsyncThunk(
  "deposit/getOrdersStatusThunk",
  async (data: GetWalletRequest, { rejectWithValue }) => {
    try {
      const response = await httpClient.get("/orders", {
        params: {
          page: data.page,
          per_page: data.per_page,
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
export const platipayThunk = createAsyncThunk(
  "deposit/platipayThunk",
  async (data: GetWalletRequest, { rejectWithValue }) => {
    try {
      const response = await httpClient.get("/admin/plati-pay", {
        params: {
          page: data.page,
          per_page: data.per_page,
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
export const getOrderSummaryThunk = createAsyncThunk(
  "deposit/getOrderSummaryThunk",
  async (_, { rejectWithValue }) => {
    try {
      const response = await httpClient.get("/orders/admin/orders-summary");
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

export const GetPlatformXThunk = createAsyncThunk(
  "deposit/GetPlatformXThunk",
  async (data: GetPlatformXRequest, { rejectWithValue }) => {
    try {
      const response = await httpClient.get("/platform-x/orders-stats", {
        params: {
          page: data.page,
          per_page: data.per_page,
          status_by_client:
            data.status_by_client === DEPOSIT_STATUSES.ALL
              ? undefined
              : data.status_by_client,
          start_date: data.start_date,
          end_date: data.start_date,
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
  "deposit/getOrdersWithStatusThunk",
  async (data: GetWalletRequest, { rejectWithValue }) => {
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
  "deposit/getSingleOrderThunk",
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
  "order/confirmOrderByAdminThunk",
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

export const confirmOrderByClientThunk = createAsyncThunk(
  "order/confirmOrderByClientThunk",
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
export const confirmDepositThunk = createAsyncThunk(
  "deposit/confirmDeposit",
  async (deposit_id: string | number, { rejectWithValue }) => {
    try {
      const response = await httpClient.post(
        `/deposits/confirm/client/${deposit_id}`
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
export const confirmDepositAdminThunk = createAsyncThunk(
  "deposit/confirmDeposit",
  async (deposit_id: string | number, { rejectWithValue }) => {
    try {
      const response = await httpClient.post(
        `/deposits/confirm/admin/${deposit_id}`
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

export const getReportUsersThunk = createAsyncThunk(
  "deposit/getReportUsersThunk",
  async (data: GetWalletRequest, { rejectWithValue }) => {
    try {
      const response = await httpClient.get(`/users/user-report`, {
        params: {
          page: data.page,
          per_page: data.per_page,
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
export const getSummaryThunk = createAsyncThunk(
  "deposit/getSummaryThunk",
  async (_, { rejectWithValue }) => {
    try {
      const response = await httpClient.get(`/orders/admin/orders-summary`);
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
