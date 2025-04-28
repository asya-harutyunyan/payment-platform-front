import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { createPermissionsThunk } from "./thunks";
import { PermissionsState } from "./types";

const initialState: PermissionsState = {
  loading: false,
  error: null,
  permissions: [],
};

const permissionsSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPermissionsThunk.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addMatcher(isPending, (state) => {
        state.loading = true;
      })
      .addMatcher(isRejected, (state) => {
        state.loading = false;
      });
  },
});

export default permissionsSlice.reducer;
