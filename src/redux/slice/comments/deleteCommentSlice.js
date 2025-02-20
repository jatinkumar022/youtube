import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/useApi";

export const deleteComment = createAsyncThunk("deleteComment", async (commentId) => {
  try {
    const response = await api.delete(
      `/comments/c/${commentId}`,
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
  deleteCommentData: null,
  isError: false,
  errorMessage: "",
};
const deleteCommentSlice = createSlice({
  name: "deleteComment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteComment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.deleteCommentData = action.payload;
    });
    builder.addCase(deleteComment.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
});

export default deleteCommentSlice.reducer;