import { httpClient } from "@/common/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getServerInfoThunk = createAsyncThunk(
  "globalInfo/getServerInfoThunk",
  async (_, { rejectWithValue }) => {
    try {
      const response = await httpClient.get("/system-config/zabbix-metrics");
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error);
        return rejectWithValue(
          error.response?.data?.message || "Something went wrong"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

export const getServerInfoLatencyThunk = createAsyncThunk(
  "globalInfo/getServerInfoLatencyThunk",
  async (_, { rejectWithValue }) => {
    try {
      const response = await httpClient.get("/system-config/check-latency");
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error);
        return rejectWithValue(
          error.response?.data?.message || "Something went wrong"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);
