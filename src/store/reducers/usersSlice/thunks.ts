import { httpClient } from "@/common/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AppState } from "../..";
import { GetUsersRequest, UsersList } from "./types";

export const getUsersThunk = createAsyncThunk(
  "users/getUsers",
  async (data: GetUsersRequest, { rejectWithValue, getState }) => {
    try {
      const {
        users: { per_page },
      } = getState() as AppState;
      const response = await httpClient.get<UsersList>("/users", {
        params: {
          page: data.page,
          per_page,
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
