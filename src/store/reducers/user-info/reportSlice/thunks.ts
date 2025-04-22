import { httpClient } from "@/common/api";
import { DEPOSIT_STATUSES } from "@/enum/deposit.status.enum";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Pagination } from "../walletSlice/types";
import {
  GetPlatformXRequest,
  NewRegisteredUsers,
  NewRegisteredUsersResponse,
} from "./types";

//newly reg users
export const newRegisteredUsersThunk = createAsyncThunk(
  "reports/newRegisteredUsersThunk",
  async (data: NewRegisteredUsers, { rejectWithValue }) => {
    try {
      const response = await httpClient.get<NewRegisteredUsersResponse>(
        "/users/newly-registered",
        {
          params: { page: data.page, per_page: data.per_page, sort: data.sort },
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
//platipay
export const platipayThunk = createAsyncThunk(
  "reports/platipayThunk",
  async (data: Pagination, { rejectWithValue }) => {
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
//report users
export const getReportUsersThunk = createAsyncThunk(
  "reports/getReportUsersThunk",
  async (data: Pagination, { rejectWithValue }) => {
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
//4 nmbers
export const getOrderSummaryThunk = createAsyncThunk(
  "reports/getOrderSummaryThunk",
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
//report 2
export const getSummaryThunk = createAsyncThunk(
  "reports/getSummaryThunk",
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
export const getProcessedAmountsThunk = createAsyncThunk(
  "reports/getProcessedAmountsThunk",
  async (_, { rejectWithValue }) => {
    try {
      const response = await httpClient.get(`/orders/admin/processed-amounts`);
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

//platform x
export const GetPlatformXThunk = createAsyncThunk(
  "reports/GetPlatformXThunk",
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
