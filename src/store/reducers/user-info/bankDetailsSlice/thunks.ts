import { httpClient } from "@/common/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  AddCardType,
  EditCardType,
  GetBankDetailsRequest,
  GetBankDetailsRequestResult,
} from "./types";

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
        // Try to extract error message dynamically from any possible format
        const responseData = error.response?.data;

        if (responseData) {
          // If response data is a string, return it directly
          if (typeof responseData === "string") {
            return rejectWithValue(responseData);
          }

          // If response data is an object, try different properties
          if (typeof responseData === "object") {
            // Try common error message fields
            const possibleErrorFields = [
              responseData.errors,
              responseData.error,
              responseData.message,
              responseData.detail,
              responseData.msg,
            ];

            for (const field of possibleErrorFields) {
              if (field) {
                if (typeof field === "string") {
                  return rejectWithValue(field);
                }
                if (typeof field === "object") {
                  return rejectWithValue(JSON.stringify(field));
                }
              }
            }

            // If no standard fields found, stringify the whole response
            return rejectWithValue(JSON.stringify(responseData));
          }
        }

        // Fallback to status text or generic message
        return rejectWithValue(
          error.response?.statusText || "Something went wrong"
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
  async (edit_cards: EditCardType, { rejectWithValue }) => {
    try {
      const response = await httpClient.post(
        `/users/update-bank-details/${edit_cards.id}`,
        {
          ...edit_cards,
          bank_name: edit_cards.bank_name.key,
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
export const unblockCardThunk = createAsyncThunk(
  "bankDetails/unblockCardThunk",
  async (id: string | number, { rejectWithValue }) => {
    try {
      const response = await httpClient.post(`/users/unblock-card/${id}`);
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
export const blockCardThunk = createAsyncThunk(
  "bankDetails/blockCardThunk",
  async (id: string | number, { rejectWithValue }) => {
    try {
      const response = await httpClient.post(`/users/block-card/${id}`);
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

export const getBankCardsThunk = createAsyncThunk(
  "bankDetails/getBankDetailsThunk",
  async (data: GetBankDetailsRequest, { rejectWithValue }) => {
    try {
      const response = await httpClient.get<GetBankDetailsRequestResult>(
        "/banks/all",
        {
          params: {
            page: data.page,
            per_page: data.per_page,
            card_holder: data.card_holder,
            card_number: data.card_number,
            currency: data.currency,
            bank_name: data.bank_name,
            from: data.from,
            to: data.to,
            name: data.name,
            sort: data.sort,
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
export const getBlockedCardsThunk = createAsyncThunk(
  "bankDetails/getBlockedCardsThunk",
  async (data: GetBankDetailsRequest, { rejectWithValue }) => {
    try {
      const response = await httpClient.get("/users/blocked-cards", {
        params: {
          page: data.page,
          per_page: data.per_page,
          name: data.name,
          surname: data.surname,
          bank_name: data.bank_name,
          card_holder: data.card_holder,
          card_number: data.card_number,
          currency: data.currency,
          from: data.from,
          to: data.to,
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
