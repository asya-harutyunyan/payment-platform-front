import { httpClient } from "@/common/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  ProcessingAmountConfirmAndStatusType,
  ProcessingAmountType,
} from "./types";

export const processingAmount = createAsyncThunk(
  "deposit/processingAmount",
  async (amount: ProcessingAmountType, { rejectWithValue }) => {
    try {
      const response = await httpClient.post("/deposits/create", amount);
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

export const processingAmountConfirm = createAsyncThunk(
  "deposit/processingAmountConfirm",
  async (
    deposit_id: ProcessingAmountConfirmAndStatusType,
    { rejectWithValue }
  ) => {
    try {
      const response = await httpClient.post(
        "/deposits/confirm/client",
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

export const processingAmountStatus = createAsyncThunk(
  "deposit/processingAmountStatus",
  async (
    deposit_id: ProcessingAmountConfirmAndStatusType,
    { rejectWithValue }
  ) => {
    try {
      const response = await httpClient.post(
        "/deposits/confirm/client",
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
