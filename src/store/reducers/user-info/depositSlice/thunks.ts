import { httpClient } from "@/common/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AppState } from "../../..";
import { GetWalletRequest } from "../../admin/walletSlice/types";
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
      const {
        deposit: { deposit },
      } = getState() as AppState;
      console.log(deposit);
      const response = await httpClient.post<Deposit>(
        `/deposits/update/${deposit?.id}`,
        data
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
  async (data: GetWalletRequest, { rejectWithValue, getState }) => {
    try {
      const {
        users: { per_page },
      } = getState() as AppState;
      const response = await httpClient.get(`/deposits`, {
        params: {
          page: data.page,
          per_page,
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
  async (data: GetWalletRequest, { rejectWithValue, getState }) => {
    const {
      users: { per_page },
    } = getState() as AppState;
    try {
      const response = await httpClient.get("/orders", {
        params: {
          page: data.page,
          per_page,
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
  "deposit/confirmDeposit",
  async (order_id: string, { rejectWithValue }) => {
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
export const confirmDepositThunk = createAsyncThunk(
  "deposit/confirmDeposit",
  async (deposit_id: string, { rejectWithValue }) => {
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
