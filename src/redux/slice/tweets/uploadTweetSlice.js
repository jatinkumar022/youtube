import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/useApi";

export const uploadTweet = createAsyncThunk("uploadTweet", async (data) => {
  try {

    const response = await api.post(
      `/tweets/`,
      data,
      {
        "Content-Type": "application/json",
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
  uploadTweetData: null,
  isError: false,
  errorMessage: "",
};
const uploadTweetSlice = createSlice({
  name: "uploadTweet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(uploadTweet.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(uploadTweet.fulfilled, (state, action) => {
      state.isLoading = false;
      state.uploadTweetData = action.payload;
    });
    builder.addCase(uploadTweet.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
});

export default uploadTweetSlice.reducer;