import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  confirmEmail,
  confirmEmailRequest,
  loginUser,
  logoutUser,
  registerUser,
} from "./thunks";
import { AuthState } from "./types";

const initialState: AuthState = {
  loading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem("accessToken"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.error = null;
      state.isAuthenticated = false;
      localStorage.removeItem("accessToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(confirmEmailRequest.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(confirmEmail.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.error = null;
        state.isAuthenticated = false;
        localStorage.removeItem("accessToken");
      })
      .addMatcher(isPending, (state) => {
        state.loading = true;
      })
      .addMatcher(isRejected, (state) => {
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
