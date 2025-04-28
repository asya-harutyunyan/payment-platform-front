import { httpClient } from "@/common/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CreatePermissions } from "./types";

export const getPermissionsThunk = createAsyncThunk(
  "permissions/getPermissionsThunk",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await httpClient.post(`/users/${id}/grant-permissions`);
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

export const createPermissionsThunk = createAsyncThunk(
  "permissions/createPermissionsThunk",
  async (data: CreatePermissions, { rejectWithValue }) => {
    try {
      const response = await httpClient.post(`/users/grant-permissions`, data);
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
