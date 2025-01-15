import { httpClient } from "@/common/api";
import { User } from "@/common/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ConfirmEmailType, LoginUserType, RegisterUserType } from "./types";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData: RegisterUserType, { rejectWithValue }) => {
    try {
      const response = await httpClient.post("/auth/register", userData);
      const { token } = response.data;

      if (token) {
        localStorage.setItem("accessToken", token);
      }
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
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData: LoginUserType, { rejectWithValue }) => {
    try {
      const response = await httpClient.post("/auth/login", userData);
      const { token } = response.data;

      if (token) {
        localStorage.setItem("accessToken", token);
      }
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Invalid login credentials"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

export const confirmEmailRequest = createAsyncThunk(
  "auth/comfirmEmailRequest",
  async (_, { rejectWithValue }) => {
    try {
      const response = await httpClient.post("/auth/confirm-email-request");
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Invalid email credentials"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);
export const confirmEmail = createAsyncThunk(
  "auth/comfirmEmail",
  async (confirmation_code: ConfirmEmailType, { rejectWithValue }) => {
    try {
      const response = await httpClient.post(
        "/auth/confirm-email",
        confirmation_code
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Invalid email credentials"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await httpClient.post("/auth/logout");
      localStorage.removeItem("user_role");
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Logout failed"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await httpClient.get<User>("/auth/user");
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "fetch user failed"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);
