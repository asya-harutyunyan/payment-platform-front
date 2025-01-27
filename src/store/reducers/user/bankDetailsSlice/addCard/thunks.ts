import { httpClient } from "@/common/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AddCardType } from "./types";

export const addBankCardThunk = createAsyncThunk(
  "bankDetails/addBankCard",
  async (add_cards: AddCardType, { rejectWithValue }) => {
    try {
      const response = await httpClient.post(
        "/users/add-bank-details",
        add_cards
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
