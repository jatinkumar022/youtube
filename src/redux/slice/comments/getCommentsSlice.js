import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/useApi";

export const getComments = createAsyncThunk("getComments", async (contentId) => {
  try {
    const response = await api.get(
      `/comments/${contentId}`,
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
  getCommentsData: null,
  isError: false,
  errorMessage: "",
};
const getCommentsSlice = createSlice({
  name: "getComments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getComments.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getComments.fulfilled, (state, action) => {
      state.isLoading = false;
      state.getCommentsData = action.payload;
    });
    builder.addCase(getComments.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
});

export default getCommentsSlice.reducer;