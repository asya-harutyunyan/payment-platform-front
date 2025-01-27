import { httpClient } from "@/common/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DepositState } from "./types";

export const processingAmount = createAsyncThunk(
  "deposit/processingAmount",
  async (amount: DepositState, { rejectWithValue }) => {
    try {
      const response = await httpClient.post("/users/add-bank-details", amount);
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
