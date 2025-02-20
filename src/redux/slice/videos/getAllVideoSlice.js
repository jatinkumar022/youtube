import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/useApi";

export const getAllVideos = createAsyncThunk("getAllVideos", async () => {
  try {
    const response = await api.get(
      `/videos`,
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
  getAllVideosData: null,
  isError: false,
  errorMessage: "",
};
const getAllVideosSlice = createSlice({
  name: "getAllVideos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllVideos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllVideos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.getAllVideosData = action.payload;
    });
    builder.addCase(getAllVideos.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
});

export default getAllVideosSlice.reducer;