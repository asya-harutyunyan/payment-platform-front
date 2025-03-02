import { httpClient } from "@/common/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AddCardType, EditCardType } from "../addCard/types";

export const addBankCardThunk = createAsyncThunk(
  "bankDetails/addBankCard",
  async (add_cards: AddCardType, { rejectWithValue }) => {
    try {
      const { bank_name: bank, ...data } = add_cards;
      const response = await httpClient.post("/users/add-bank-details", {
        ...data,
        bank_name: bank.key,
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
export const getCardsThunk = createAsyncThunk(
  "bankDetails/getCardsThunk",
  async (_, { rejectWithValue }) => {
    try {
      const response = await httpClient.get("/users/get-bank-details");
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

export const deleteBankCardThunk = createAsyncThunk(
  "bankDetails/deleteBankCardThunk",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await httpClient.delete(
        `users/delete-bank-details/${id}`
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

export const editBankCardThunk = createAsyncThunk(
  "bankDetails/editBankCard",
  async (edit_card: EditCardType, { rejectWithValue }) => {
    try {
      const { bank_name: bank, ...data } = edit_card;
      const response = await httpClient.post(
        `/users/update-bank-details/${edit_card.id}`,
        { ...data, bank_name: bank.key }
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
