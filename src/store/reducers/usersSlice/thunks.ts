import { httpClient } from "@/common/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { GetWalletRequest } from "../admin/walletSlice/types";
import { GetUsersRequest, UsersList } from "./types";

export const getUsersThunk = createAsyncThunk(
  "users/getUsers",
  async (data: GetUsersRequest, { rejectWithValue }) => {
    try {
      const response = await httpClient.get<UsersList>("/users", {
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
export const getBankNamesThunk = createAsyncThunk(
  "bankDetails/getBankNamesThunk",
  async (_, { rejectWithValue }) => {
    try {
      const response = await httpClient.get("/banks");
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data.errors) {
          return rejectWithValue(
            error.response?.data.errors || "Something went wrong"
          );
        }
        return rejectWithValue(
          error.response?.data?.message || "Something went wrong"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);
export const getUserThunk = createAsyncThunk(
  "users/getUser",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await httpClient.get(`/users/${id}`);
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

export const getUserReferalThunk = createAsyncThunk(
  "users/getUserReferalThunk",
  async (_, { rejectWithValue }) => {
    try {
      const response = await httpClient.post("/referrals/generate");
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data.errors) {
          return rejectWithValue(
            error.response?.data.errors || "Something went wrong"
          );
        }
        return rejectWithValue(
          error.response?.data?.message || "Something went wrong"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

export const getReferalsOfUserThunk = createAsyncThunk(
  "deposit/getReferalsOfUserThunk",
  async (data: GetWalletRequest, { rejectWithValue }) => {
    try {
      const response = await httpClient.get("/referrals/users-referrals", {
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

export const getReferredUsersThunk = createAsyncThunk(
  "deposit/getReferredUsersThunk",
  async (data: GetWalletRequest, { rejectWithValue }) => {
    try {
      const response = await httpClient.get("/referrals/referred-users", {
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
