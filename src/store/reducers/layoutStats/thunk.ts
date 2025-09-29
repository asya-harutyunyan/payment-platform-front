import { httpClient } from "@/common/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { LayoutStats } from "./types";

export const getLayoutStatsThunk = createAsyncThunk<
  LayoutStats,
  void,
  { rejectValue: string }
>("layoutStats/getLayoutStats", async (_, { rejectWithValue }) => {
  try {
    const response = await httpClient.get("/layout-stats");
    return response.data as LayoutStats;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      interface ErrorResponse {
        message?: string;
      }
      const errorData = error.response?.data as ErrorResponse;
      return rejectWithValue(
        errorData?.message || "Failed to load layout stats"
      );
    }
    return rejectWithValue("An unexpected error occurred");
  }
});
