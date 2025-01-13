import { httpClient } from "@/common/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RegisterUserType } from "./types";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData: RegisterUserType, { rejectWithValue }) => {
    try {
      const response = await httpClient.post("/auth/register", userData);
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
