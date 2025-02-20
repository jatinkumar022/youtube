import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/useApi";

export const getChannelVideos = createAsyncThunk("getChannelVideos", async (channelId) => {
  try {
    const response = await api.get(
      `/videos/c/${channelId}`,
      {

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
  getChannelVideosData: null,
  isError: false,
  errorMessage: "",
};
const getChannelVideosSlice = createSlice({
  name: "getChannelVideos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getChannelVideos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getChannelVideos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.getChannelVideosData = action.payload;
    });
    builder.addCase(getChannelVideos.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
});

export default getChannelVideosSlice.reducer;