import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/useApi";

export const updateCoverImage = createAsyncThunk("updateCoverImage", async (data) => {
  try {

    const response = await api.patch("/users/cover-image", data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )

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
  updateCoverImageData: null,
  isError: false,
  errorMessage: "",
};
const updateCoverImageSlice = createSlice({
  name: "updateCoverImage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateCoverImage.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateCoverImage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.updateCoverImageData = action.payload;
    });
    builder.addCase(updateCoverImage.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
});

export default updateCoverImageSlice.reducer;