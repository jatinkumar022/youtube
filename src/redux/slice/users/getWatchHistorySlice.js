import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/useApi";

export const getWatchHistory = createAsyncThunk("getWatchHistory", async () => {
  try {
    const response = await api.get("/users/history", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    } else {
      throw error;
    }
  }
});

const initialState = {
  isLoading: false,
  getWatchHistoryData: null,
  isError: false,
  errorMessage: "",
};
const getWatchHistorySlice = createSlice({
  name: "getWatchHistory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWatchHistory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getWatchHistory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.getWatchHistoryData = action.payload;
    });
    builder.addCase(getWatchHistory.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
});

export default getWatchHistorySlice.reducer;