import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/useApi";

export const isLikedComment = createAsyncThunk("isLikedComment", async (commentId) => {
  try {
    const response = await api.get(
      `/likes/toggle/c/${commentId}`
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
  isLikedCommentData: null,
  isError: false,
  errorMessage: "",
};
const isLikedCommentSlice = createSlice({
  name: "isLikedComment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(isLikedComment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(isLikedComment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLikedCommentData = action.payload;
    });
    builder.addCase(isLikedComment.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
});

export default isLikedCommentSlice.reducer;