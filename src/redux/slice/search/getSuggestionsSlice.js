import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/useApi";

export const getSuggestions = createAsyncThunk("getSuggestions", async (query) => {
  try {
    const response = await api.get(
      `/videos/suggestions?query=${query}`,
      {

        headers: {
          "Content-Type": "multipart/form-data",
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
  getSuggestionsData: null,
  isError: false,
  errorMessage: "",
};
const getSuggestionsSlice = createSlice({
  name: "getSuggestions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSuggestions.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSuggestions.fulfilled, (state, action) => {
      state.isLoading = false;
      state.getSuggestionsData = action.payload;
    });
    builder.addCase(getSuggestions.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
});

export default getSuggestionsSlice.reducer;