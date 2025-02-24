import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/useApi";

export const getmyVideos = createAsyncThunk("getmyVideos", async () => {
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
  getmyVideosData: null,
  isError: false,
  errorMessage: "",
};
const getmyVideosSlice = createSlice({
  name: "getmyVideos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getmyVideos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getmyVideos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.getmyVideosData = action.payload;
    });
    builder.addCase(getmyVideos.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
});

export default getmyVideosSlice.reducer;