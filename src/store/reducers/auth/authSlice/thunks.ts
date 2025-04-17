import { httpClient } from "@/common/api";
import { User } from "@/common/types";
import { ConfirmEmailFormData } from "@/components/organisms/auth/change-password-form";
import { ResetPasswordschema } from "@/components/organisms/auth/reset-password-form/_services/useLogin";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  ConfirmEmailType,
  FetchUserResponseType,
  LoginUserType,
  RegisterUserType,
} from "./types";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData: RegisterUserType, { rejectWithValue }) => {
    try {
      const response = await httpClient.post("/auth/register", userData);
      const { token } = response.data;

      if (token) {
        localStorage.setItem("accessToken", token);
      }
      return response;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Something went wrong");
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
          error.response?.data || "Invalid login credentials"
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
          error.response?.data || "Invalid email credentials"
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
          error.response?.data || "Invalid email credentials"
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
      const notification_token = localStorage.getItem("notification_token");
      httpClient
        .post("/remove-fcm-token", {
          fcm_token: notification_token,
        })
        .then(() => {
          localStorage.removeItem("notification_token");
        });
      const response = await httpClient.post("/auth/logout");
      localStorage.removeItem("user_role");
      localStorage.removeItem("accessToken");
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
      const response =
        await httpClient.get<FetchUserResponseType>("/auth/user");
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
export const resetPassword = createAsyncThunk<User, ResetPasswordschema>(
  "auth/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await httpClient.post<User>(
        "/auth/password/reset/request",
        data
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Reset password failed");
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);
export const changePassword = createAsyncThunk<User, ConfirmEmailFormData>(
  "auth/changePassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await httpClient.post<User>(
        "/auth/password/reset",
        data
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Change password failed"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);
export const blockUserThunk = createAsyncThunk(
  "auth/blockUserThunk",
  async (id: string | number, { rejectWithValue }) => {
    try {
      const response = await httpClient.post(`/users/block/${id}`);
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

export const unblockUserThunk = createAsyncThunk(
  "auth/unblockUserThunk",
  async (id: string | number, { rejectWithValue }) => {
    try {
      const response = await httpClient.post(`/users/unblock/${id}`);
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
