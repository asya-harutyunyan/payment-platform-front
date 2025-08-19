import { httpClient } from "@/common/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AppState } from "../../..";
import {
  AmountType,
  Deposit,
  DepositLimitsrequest,
  DepositRequest,
  ManageLimitRequest,
  UpdateLimit,
  WalletDetalisType,
} from "./types";
//first step
export const createDepositThunk = createAsyncThunk(
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
//confirm by user
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
//confirm by admin
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
//second step select card
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
//deposit-lists
export const getDepositsThunk = createAsyncThunk(
  "deposit/getDepositsThunk",
  async (data: DepositRequest, { rejectWithValue }) => {
    try {
      const response = await httpClient.get(`/deposits`, {
        params: {
          page: data.page,
          per_page: data.per_page,
          sort: data.sort,
          status_by_admin: data.status_by_admin,
          type: data.type,
          from: data.from,
          to: data.to,
          surname: data.name,
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
export const getDepositsAdminThunk = createAsyncThunk(
  "deposit/getDepositsAdminThunk",
  async (data: DepositRequest, { rejectWithValue }) => {
    try {
      const response = await httpClient.get(`/deposits/admin`, {
        params: {
          page: data.page,
          per_page: data.per_page,
          sort: data.sort,
          status_by_admin: data.status_by_admin,
          type: data.type,
          from: data.from,
          to: data.to,
          name: data.name,
          surname: data.surname,
          amount: data.amount,
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

export const getDepositsHistoryAdminThunk = createAsyncThunk(
  "deposit/getDepositsHistoryAdminThunk",
  async (data: DepositLimitsrequest, { rejectWithValue }) => {
    try {
      const response = await httpClient.get(`/deposits-action-logs`, {
        params: {
          page: data.page,
          per_page: data.per_page,
          by_fullname: data.by_fullname,
          by_email: data.by_email,
          to_email: data.to_email,
          to_fullname: data.to_fullname,
          action: data.action,
          role: data.role,
          to: data.to,
          from: data.from,
          date: data.date,
          sort: data.sort,
        },
      });
      return response.data.data;
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
//single deposit
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

export const manageDepositLimitThunk = createAsyncThunk(
  "deposit/manageDepositLimitThunk",
  async (data: ManageLimitRequest, { rejectWithValue }) => {
    try {
      const response = await httpClient.get(`/deposit-limits`, {
        params: {
          page: data.page,
          per_page: data.per_page,
          name: data.name,
          surname: data.surname,
          email: data.email,
          role: data.role,
          limit: data.limit,
          sort: data.sort,
        },
      });
      return response.data.data;
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

export const updateLimitDepositsThunk = createAsyncThunk(
  "deposit/confirmDeposit",
  async (data: UpdateLimit, { rejectWithValue }) => {
    try {
      const response = await httpClient.post(
        `/deposit-limits/${data.user_id}`,
        {
          limit: data.limit,
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
