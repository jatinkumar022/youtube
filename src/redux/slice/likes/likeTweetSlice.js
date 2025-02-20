import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/useApi";

export const likeTweet = createAsyncThunk("likeTweet", async (tweetId) => {
  try {
    const response = await api.post(
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
  likeTweetData: null,
  isError: false,
  errorMessage: "",
};
const likeTweetSlice = createSlice({
  name: "likeTweet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(likeTweet.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(likeTweet.fulfilled, (state, action) => {
      state.isLoading = false;
      state.likeTweetData = action.payload;
    });
    builder.addCase(likeTweet.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
});

export default likeTweetSlice.reducer;