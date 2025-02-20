import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/useApi";

export const likeComment = createAsyncThunk("likeComment", async (commentId) => {
  try {
    const response = await api.post(
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
  likeCommentData: null,
  isError: false,
  errorMessage: "",
};
const likeCommentSlice = createSlice({
  name: "likeComment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(likeComment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(likeComment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.likeCommentData = action.payload;
    });
    builder.addCase(likeComment.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
});

export default likeCommentSlice.reducer;