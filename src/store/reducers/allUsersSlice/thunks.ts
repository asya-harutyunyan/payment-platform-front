import { httpClient } from "@/common/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Pagination } from "../user-info/walletSlice/types";
import { GetUsersRequest, PercentsData, PriceData, UsersList } from "./types";

export const getUsersThunk = createAsyncThunk(
  "users/getUsers",
  async (data: GetUsersRequest, { rejectWithValue }) => {
    try {
      const response = await httpClient.get<UsersList>("/users", {
        params: {
          page: data.page,
          per_page: data.per_page,
          name: data.name,
          surname: data.surname,
          month: data.month,
          email: data.email,
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

export const getBlockedUsersThunk = createAsyncThunk(
  "users/getBlockedUsersThunk",
  async (data: GetUsersRequest, { rejectWithValue }) => {
    try {
      const response = await httpClient.get<UsersList>("/users/blocked", {
        params: {
          page: data.page,
          per_page: data.per_page,
          name: data.name,
          surname: data.surname,
          month: data.month,
          email: data.email,
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

export const generateCodeReferralThunk = createAsyncThunk(
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
export const updatePercentThunk = createAsyncThunk(
  "users/updatePercentThunk",
  async (data: PercentsData, { rejectWithValue }) => {
    try {
      const response = await httpClient.post(
        "/admin/referrals/update-percentage",
        {
          referral_percentage: data.percentage,
          referral_id: data.referral_id,
          user_id: data.user_id,
        }
      );
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
export const updatePriceThunk = createAsyncThunk(
  "users/updatePercentThunk",
  async (data: PriceData, { rejectWithValue }) => {
    try {
      const response = await httpClient.post("/admin/referrals/update-amount", {
        amount_to_deduct: data.amount_to_deduct,
        referral_id: Number(data.referral_id),
        user_id: data.user_id,
      });
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
export const getReferalsUserThunk = createAsyncThunk(
  "deposit/getReferalsOfUserThunk",
  async (data: Pagination, { rejectWithValue }) => {
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

export const getReferredUsersForAdminThunk = createAsyncThunk(
  "deposit/getReferredUsersForAdminThunk",
  async (data: Pagination, { rejectWithValue }) => {
    try {
      const response = await httpClient.get("/admin/referrals/stats", {
        params: {
          page: data.page,
          per_page: data.per_page,
          name: data.name,
          surname: data.surname,
          email: data.email,
          sort_by: data.sort_by,
          month: data.month,
          sort_order: data.sort_order,
          period: data.period,
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

export const getReferedUsersListThunk = createAsyncThunk(
  "deposit/getReferedUsersListThunk",
  async (data: Pagination, { rejectWithValue }) => {
    try {
      const response = await httpClient.get(
        `/admin/referrals/get-referred-users/${data.id}`,
        {
          params: {
            page: data.page,
            per_page: data.per_page,
          },
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
