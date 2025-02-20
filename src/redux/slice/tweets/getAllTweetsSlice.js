import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/useApi";

export const getAllTweets = createAsyncThunk("getAllTweets", async () => {
  try {

    const response = await api.get(
      `/tweets/`
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
  getAllTweetsData: null,
  isError: false,
  errorMessage: "",
};
const getAllTweetsSlice = createSlice({
  name: "getAllTweets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllTweets.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllTweets.fulfilled, (state, action) => {
      state.isLoading = false;
      state.getAllTweetsData = action.payload;
    });
    builder.addCase(getAllTweets.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
});

export default getAllTweetsSlice.reducer;