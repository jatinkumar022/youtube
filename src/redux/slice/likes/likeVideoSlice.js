import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/useApi";

export const likeVideo = createAsyncThunk("likeVideo", async (videoId) => {
  try {
    const response = await api.post(
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
  likeVideoData: null,
  isError: false,
  errorMessage: "",
};
const likeVideoSlice = createSlice({
  name: "likeVideo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(likeVideo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(likeVideo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.likeVideoData = action.payload;
    });
    builder.addCase(likeVideo.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
});

export default likeVideoSlice.reducer;