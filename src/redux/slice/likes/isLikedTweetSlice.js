import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/useApi";

export const isLikedTweet = createAsyncThunk("isLikedTweet", async (tweetId) => {
  try {
    const response = await api.get(
      `/likes/toggle/t/${tweetId}`
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
  isLikedTweetData: null,
  isError: false,
  errorMessage: "",
};
const isLikedTweetSlice = createSlice({
  name: "isLikedTweet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(isLikedTweet.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(isLikedTweet.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLikedTweetData = action.payload;
    });
    builder.addCase(isLikedTweet.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
});

export default isLikedTweetSlice.reducer;