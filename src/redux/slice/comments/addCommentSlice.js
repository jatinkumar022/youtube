import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/useApi";

export const addComment = createAsyncThunk("addComment", async (comment) => {
  try {
    const response = await api.post(
      `/comments/${comment?.videoId}`,
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
  addCommentData: null,
  isError: false,
  errorMessage: "",
};
const addCommentSlice = createSlice({
  name: "addComment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addComment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.addCommentData = action.payload;
    });
    builder.addCase(addComment.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
});

export default addCommentSlice.reducer;