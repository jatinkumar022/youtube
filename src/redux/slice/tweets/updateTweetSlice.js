import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/useApi";

export const updateTweet = createAsyncThunk("updateTweet", async (data) => {
  try {
    const response = await api.patch(
      `/tweets/${data?.tweetId
      }`,
      { content: data?.content },
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
  updateTweetData: null,
  isError: false,
  errorMessage: "",
};
const updateTweetSlice = createSlice({
  name: "updateTweet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateTweet.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateTweet.fulfilled, (state, action) => {
      state.isLoading = false;
      state.updateTweetData = action.payload;
    });
    builder.addCase(updateTweet.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
});

export default updateTweetSlice.reducer;