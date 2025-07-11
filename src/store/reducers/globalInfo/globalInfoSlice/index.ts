import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { getServerInfoThunk } from "./thunks";
import { ServerInfoState } from "./types";

const initialState: ServerInfoState = {
  loading: false,
  error: null,
};

const globalInfoSlice = createSlice({
  name: "globalInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getServerInfoThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.serverInfo = action.payload;
      })
      .addMatcher(isPending, (state) => {
        state.loading = true;
      })
      .addMatcher(isRejected, (state) => {
        state.loading = false;
      });
  },
});

export default globalInfoSlice.reducer;
