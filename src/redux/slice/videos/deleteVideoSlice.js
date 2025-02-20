import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/useApi";

export const deleteVideo = createAsyncThunk("deleteVideo", async (videoId) => {
  try {
    const response = await api.delete(
      `/videos/${videoId}`,
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
  deleteVideoData: null,
  isError: false,
  errorMessage: "",
};
const deleteVideoSlice = createSlice({
  name: "deleteVideo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteVideo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteVideo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.deleteVideoData = action.payload;
    });
    builder.addCase(deleteVideo.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
});

export default deleteVideoSlice.reducer;