import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/useApi";

export const getChannelStats = createAsyncThunk("getChannelStats", async (data) => {
  try {
    const response = await api.get(
      `/dashboard/stats`,
      data, {

      headers: {
        "Content-Type": "application/json",

      },
    }
    );

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
  getChannelStatsData: null,
  isError: false,
  errorMessage: "",
};
const getChannelStatsSlice = createSlice({
  name: "getChannelStats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getChannelStats.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getChannelStats.fulfilled, (state, action) => {
      state.isLoading = false;
      state.getChannelStatsData = action.payload;
    });
    builder.addCase(getChannelStats.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
});

export default getChannelStatsSlice.reducer;