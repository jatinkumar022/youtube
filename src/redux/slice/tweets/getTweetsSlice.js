import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/useApi";

export const getTweets = createAsyncThunk("getTweets", async (user) => {
  try {

    const response = await api.get(
      `/tweets/user/${user}`
      ,
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
  getTweetsData: null,
  isError: false,
  errorMessage: "",
};
const getTweetsSlice = createSlice({
  name: "getTweets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTweets.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTweets.fulfilled, (state, action) => {
      state.isLoading = false;
      state.getTweetsData = action.payload;
    });
    builder.addCase(getTweets.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
});

export default getTweetsSlice.reducer;