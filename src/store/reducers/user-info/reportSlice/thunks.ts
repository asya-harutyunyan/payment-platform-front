import { httpClient } from "@/common/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Pagination } from "../walletSlice/types";
import {
  GetPlatformXRequest,
  HistoryRequest,
  NewRegisteredUsers,
  NewRegisteredUsersResponse,
  PlatipayRequest,
  TReportData,
} from "./types";

//newly reg users
export const newRegisteredUsersThunk = createAsyncThunk(
  "reports/newRegisteredUsersThunk",
  async (data: NewRegisteredUsers, { rejectWithValue }) => {
    try {
      const response = await httpClient.get<NewRegisteredUsersResponse>(
        "/users/newly-registered",
        {
          params: {
            page: data.page,
            per_page: data.per_page,
            sort: data.sort,
            name: data.name,
            surname: data.surname,
            email: data.email,
            from: data.from,
            to: data.to,
          },
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
  async (data: PlatipayRequest, { rejectWithValue }) => {
    try {
      const response = await httpClient.get("/admin/plati-pay", {
        params: {
          page: data.page,
          per_page: data.per_page,
          amount: data.amount,
          status_by_client: data.status_by_client,
          transaction_id: data.transaction_id,
          from: data.from,
          to: data.to,
          sort: data.sort,
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
export const historyThunk = createAsyncThunk(
  "reports/historyThunk",
  async (data: HistoryRequest, { rejectWithValue }) => {
    try {
      const response = await httpClient.get("/action-logs", {
        params: {
          page: data.page,
          per_page: data.per_page,
          by_fullname: data.by_fullname,
          by_email: data.by_email,
          to_email: data.to_email,
          to_fullname: data.to_fullname,
          from: data.from,
          to: data.to,
          action: data.action,
          role: data.role,
          sort: data.sort,
          date: data.date,
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
          from: data.from,
          to: data.to,
          name: data.name,
          surname: data.surname,
          email: data.email,
          sort: data.sort,
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
  async (data: GetPlatformXRequest, { rejectWithValue }) => {
    try {
      const response = await httpClient.get(`/orders/admin/processed-amounts`, {
        params: {
          from: data.from,
          to: data.to,
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

//platform x
export const GetPlatformXThunk = createAsyncThunk(
  "reports/GetPlatformXThunk",
  async (data: GetPlatformXRequest, { rejectWithValue }) => {
    try {
      const response = await httpClient.get("/platform-x/orders-stats", {
        params: {
          from: data.from,
          to: data.to,
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

type TFileExportResponse = {
  filename: string;
  url: string;
};

export const downloadReportThunk = createAsyncThunk(
  "reports/downloadReportThunk",
  async (data: TReportData, { rejectWithValue }) => {
    try {
      const response = await httpClient.post<TFileExportResponse>(
        "/export",
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
