import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/useApi";

export const togglePublish = createAsyncThunk("togglePublish", async (data) => {
  try {
    const response = await api.patch(
      `/videos/toggle/publish/${data?.videoId}`,
      {
        isPublished: data?.isPublished
      },
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
  togglePublishData: null,
  isError: false,
  errorMessage: "",
};
const togglePublishSlice = createSlice({
  name: "togglePublish",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(togglePublish.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(togglePublish.fulfilled, (state, action) => {
      state.isLoading = false;
      state.togglePublishData = action.payload;
    });
    builder.addCase(togglePublish.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
});

export default togglePublishSlice.reducer;