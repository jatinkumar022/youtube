import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/useApi";

export const uploadVideo = createAsyncThunk("uploadVideo", async (data) => {
  try {
    const response = await api.post(
      `/videos/`,
      data, {

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
  uploadVideoData: null,
  isError: false,
  errorMessage: "",
};
const uploadVideoSlice = createSlice({
  name: "uploadVideo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(uploadVideo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(uploadVideo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.uploadVideoData = action.payload;
    });
    builder.addCase(uploadVideo.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
});

export default uploadVideoSlice.reducer;