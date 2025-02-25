import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/useApi";

export const getSearchResults = createAsyncThunk("getSearchResults", async (query) => {


  try {
    const response = await api.get(
      `/videos?query=${query}`,

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
  getSearchResultsData: null,
  isError: false,
  errorMessage: "",
};
const getSearchResultsSlice = createSlice({
  name: "getSearchResults",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSearchResults.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSearchResults.fulfilled, (state, action) => {
      state.isLoading = false;
      state.getSearchResultsData = action.payload;
    });
    builder.addCase(getSearchResults.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
});

export default getSearchResultsSlice.reducer;