import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/useApi";

export const getYourVideos = createAsyncThunk("getYourVideos", async () => {
  try {
    const response = await api.get(
      `/dashboard/videos`,
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
  getYourVideosData: null,
  isError: false,
  errorMessage: "",
};
const getYourVideosSlice = createSlice({
  name: "getYourVideos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getYourVideos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getYourVideos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.getYourVideosData = action.payload;
    });
    builder.addCase(getYourVideos.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
});

export default getYourVideosSlice.reducer;