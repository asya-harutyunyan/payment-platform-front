import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  changePassword,
  confirmEmail,
  confirmEmailRequest,
  fetchUser,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
} from "./thunks";
import { AuthState } from "./types";

const initialState: AuthState = {
  loading: false,
  error: null,
  email: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.error = null;
      localStorage.removeItem("accessToken");
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(confirmEmailRequest.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(confirmEmail.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.error = null;
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
export const { setEmail } = authSlice.actions;

export default authSlice.reducer;
