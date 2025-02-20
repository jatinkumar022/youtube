import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/useApi";

export const isLikedVideo = createAsyncThunk("isLikedVideo", async (videoId) => {
  try {
    const response = await api.get(
      `/likes/toggle/v/${videoId}`
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
  isLikedVideoData: null,
  isError: false,
  errorMessage: "",
};
const isLikedVideoSlice = createSlice({
  name: "isLikedVideo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(isLikedVideo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(isLikedVideo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLikedVideoData = action.payload;
    });
    builder.addCase(isLikedVideo.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
});

export default isLikedVideoSlice.reducer;