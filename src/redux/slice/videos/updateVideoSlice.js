import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/useApi";

export const updateVideo = createAsyncThunk("updateVideo", async (videoDetails) => {
  try {

    const response = await api.patch(
      `/videos/${videoDetails?.videoId}`,
      videoDetails?.formData, {

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
  updateVideoData: null,
  isError: false,
  errorMessage: "",
};
const updateVideoSlice = createSlice({
  name: "updateVideo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateVideo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateVideo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.updateVideoData = action.payload;
    });
    builder.addCase(updateVideo.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
});

export default updateVideoSlice.reducer;