import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/useApi";

export const getLikedVideos = createAsyncThunk("getLikedVideos", async () => {
  try {
    const response = await api.get(
      `/likes/videos`
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
  getLikedVideosData: null,
  isError: false,
  errorMessage: "",
};
const getLikedVideosSlice = createSlice({
  name: "getLikedVideos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLikedVideos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getLikedVideos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.getLikedVideosData = action.payload;
    });
    builder.addCase(getLikedVideos.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
});

export default getLikedVideosSlice.reducer;