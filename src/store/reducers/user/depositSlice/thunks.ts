import { httpClient } from "@/common/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AmountType, Deposit, WalletDetalisType } from "./types";
//first step
export const processingAmount = createAsyncThunk(
  "deposit/processingAmount",
  async (amount: AmountType, { rejectWithValue }) => {
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
export const processingAmountConfirm = createAsyncThunk(
  "deposit/processingAmountConfirm",
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

export const processingAmountStatus = createAsyncThunk(
  "deposit/processingAmountStatus",
  async (deposit_id: AmountType, { rejectWithValue }) => {
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
