import { httpClient } from "@/common/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { NewRegisteredUsers, NewRegisteredUsersResponse } from "./types";

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
