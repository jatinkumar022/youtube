import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/useApi";

export const updateComment = createAsyncThunk("updateComment", async (comment) => {
  try {
    const response = await api.patch(
      `/comments/c/${comment?.commentId}`,
      { content: comment?.content }, {

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
  updateCommentData: null,
  isError: false,
  errorMessage: "",
};
const updateCommentSlice = createSlice({
  name: "updateComment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateComment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateComment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.updateCommentData = action.payload;
    });
    builder.addCase(updateComment.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
});

export default updateCommentSlice.reducer;