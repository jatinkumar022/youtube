import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/useApi";

export const incrementVideoView = createAsyncThunk("incrementVideoView", async (videoId) => {
  try {
    const response = await api.patch(
      `/videos/${videoId}/views`,
      {

        headers: {
          "Content-Type": "multipart/form-data",
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
  incrementVideoViewData: null,
  isError: false,
  errorMessage: "",
};
const incrementVideoViewSlice = createSlice({
  name: "incrementVideoView",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(incrementVideoView.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(incrementVideoView.fulfilled, (state, action) => {
      state.isLoading = false;
      state.incrementVideoViewData = action.payload;
    });
    builder.addCase(incrementVideoView.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
});

export default incrementVideoViewSlice.reducer;