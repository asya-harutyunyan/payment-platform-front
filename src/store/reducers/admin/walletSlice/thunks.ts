import { httpClient } from "@/common/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CreateWallet, GetWalletRequest } from "./types";

export const getWalletsThunk = createAsyncThunk(
  "Wallets/getWalletsThunk",
  async (data: GetWalletRequest, { rejectWithValue }) => {
    try {
      const response = await httpClient.get("/wallets", {
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

export const createWalletsThunk = createAsyncThunk(
  "Wallets/createWalletsThunk",
  async (data: CreateWallet, { rejectWithValue }) => {
    try {
      const response = await httpClient.post<CreateWallet>(
        "/wallets/create",
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

export const deleteWalletsThunk = createAsyncThunk(
  "Wallets/deleteWalletsThunk",
  async (id: number | string, { rejectWithValue }) => {
    try {
      const response = await httpClient.delete(`/wallets/${id}`);
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
