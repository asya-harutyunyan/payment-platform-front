import { createSlice } from "@reduxjs/toolkit";
import { getLayoutStatsThunk } from "./thunk";
import type { LayoutStatsState } from "./types";

const initialState: LayoutStatsState = {
  loading: false,
  error: null,
};

const layoutStatsSlice = createSlice({
  name: "layoutStats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLayoutStatsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLayoutStatsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getLayoutStatsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load layout stats";
      });
  },
});

export default layoutStatsSlice.reducer;
