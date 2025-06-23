import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  changePassword,
  confirmEmail,
  confirmEmailRequest,
  enableTwoFAThunk,
  fetchUser,
  getUserRoleThunk,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  setupTwoFAThunk,
} from "./thunks";
import { AuthState, TSignInTFAErrorData } from "./types";

const initialState: AuthState = {
  loading: false,
  error: null,
  email: "",

  setupTwoFAData: null,
  signInTFAErrorData: null,
  getUserRoleData: null,
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
    resetRoleData: (state) => {
      state.getUserRoleData = null;
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
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.signInTFAErrorData = payload as TSignInTFAErrorData;
        state.loading = false;
      })
      .addCase(getUserRoleThunk.fulfilled, (state, { payload }) => {
        state.getUserRoleData = payload;
        state.loading = false;
      })
      .addCase(setupTwoFAThunk.fulfilled, (state, { payload }) => {
        state.setupTwoFAData = payload;
        state.loading = false;
      })
      .addCase(enableTwoFAThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addMatcher(isPending, (state) => {
        state.loading = true;
      })
      .addMatcher(isRejected, (state) => {
        state.loading = false;
      });
  },
});
export const { setEmail, resetRoleData } = authSlice.actions;

export default authSlice.reducer;
