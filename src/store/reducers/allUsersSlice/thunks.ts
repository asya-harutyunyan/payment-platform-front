import { httpClient } from "@/common/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Pagination } from "../user-info/walletSlice/types";
import {
  GetUsersRequest,
  PercentsData,
  PriceData,
  TCreateSystemConfigThunkOptions,
  TCreateSystemConfigThunkResponse,
  TGetActiveActiveUsersThunkResponse,
  TGetSystemConfigThunkError,
  TGetSystemConfigThunkOptions,
  TGetSystemConfigThunkResponse,
  TUpdateSystemConfigThunkOptions,
  TUpdateSystemConfigThunkResponse,
  UsersList,
} from "./types";

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
          to: data.to,
          from: data.from,
          email: data.email,
          role: data.role,
          sort: data.sort,
          month: data.month,
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
export const getFreezedUsersThunk = createAsyncThunk(
  "users/getFreezedUsers",
  async (data: GetUsersRequest, { rejectWithValue }) => {
    try {
      const response = await httpClient.get<UsersList>("/freezed", {
        params: {
          page: data.page,
          per_page: data.per_page,
          name: data.name,
          surname: data.surname,
          to: data.to,
          from: data.from,
          email: data.email,
          sort: data.sort,
          month: data.month,
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
          to: data.to,
          from: data.from,
          email: data.email,
          sort: data.sort,
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
export const getFreezeUserThunk = createAsyncThunk(
  "users/getFreezeUserThunk",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await httpClient.get(`/freezed/${id}/expired-orders`);
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
export const deleteFreezeUserThunk = createAsyncThunk(
  "users/getFreezeUserThunk",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await httpClient.delete(`/freezed/${id}/expired-orders`);
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
        // referral_id: data.referral_id,
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
          from: data.from,
          to: data.to,
          sort: data.sort,
          period: data.period,
          referral_code: data.referral_code,
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

export const createSystemConfigThunk = createAsyncThunk<
  TCreateSystemConfigThunkResponse["data"],
  TCreateSystemConfigThunkOptions
>("deposit/createSystemConfigThunk", async (data, { rejectWithValue }) => {
  try {
    const response = await httpClient.post<TCreateSystemConfigThunkResponse>(
      "/system-config",
      data
    );

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }

    return rejectWithValue("An unexpected error occurred");
  }
});

export const getSystemConfigThunk = createAsyncThunk<
  TGetSystemConfigThunkResponse,
  TGetSystemConfigThunkOptions,
  { rejectValue: TGetSystemConfigThunkError }
>("deposit/getSystemConfigThunk", async (params, { rejectWithValue }) => {
  try {
    const response = await httpClient.get<TGetSystemConfigThunkResponse>(
      "/system-config",
      { params }
    );

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue({
        message: error.response?.data?.message || "Something went wrong",
        status: error.response?.status,
      });
    }

    return rejectWithValue("An unexpected error occurred");
  }
});

export const updateSystemConfigThunk = createAsyncThunk<
  TUpdateSystemConfigThunkResponse["data"],
  TUpdateSystemConfigThunkOptions
>("deposit/updateSystemConfigThunk", async (data, { rejectWithValue }) => {
  try {
    const response = await httpClient.patch<TUpdateSystemConfigThunkResponse>(
      "/system-config",
      data
    );

    return response.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }

    return rejectWithValue("An unexpected error occurred");
  }
});

export const getActiveActiveUsersThunk = createAsyncThunk<
  TGetActiveActiveUsersThunkResponse,
  void
>("deposit/getActiveActiveUsersThunk", async (_, { rejectWithValue }) => {
  try {
    const response =
      await httpClient.get<TGetActiveActiveUsersThunkResponse>("/active-users");

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }

    return rejectWithValue("An unexpected error occurred");
  }
});
