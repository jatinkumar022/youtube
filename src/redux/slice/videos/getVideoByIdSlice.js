import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/useApi";

export const getVideoById = createAsyncThunk("getVideoById", async (videoId) => {
  try {
    const response = await api.get(
      `/videos/${videoId}`,
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
  getVideoByIdData: null,
  isError: false,
  errorMessage: "",
};
const getVideoByIdSlice = createSlice({
  name: "getVideoById",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getVideoById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getVideoById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.getVideoByIdData = action.payload;
    });
    builder.addCase(getVideoById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
});

export default getVideoByIdSlice.reducer;