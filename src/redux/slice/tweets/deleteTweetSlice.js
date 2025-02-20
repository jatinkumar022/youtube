import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/useApi";

export const deleteTweet = createAsyncThunk("deleteTweet", async (tweet) => {
  try {

    const response = await api.delete(
      `/tweets/${tweet}`,

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
  deleteTweetData: null,
  isError: false,
  errorMessage: "",
};
const deleteTweetSlice = createSlice({
  name: "deleteTweet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteTweet.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteTweet.fulfilled, (state, action) => {
      state.isLoading = false;
      state.deleteTweetData = action.payload;
    });
    builder.addCase(deleteTweet.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
});

export default deleteTweetSlice.reducer;