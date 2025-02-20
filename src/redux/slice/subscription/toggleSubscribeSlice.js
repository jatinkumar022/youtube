import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/useApi";

export const toggleSubscribe = createAsyncThunk("toggleSubscribe", async (userId) => {
  try {
    const response = await api.post(
      `/subscriptions/c/${userId}`
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
  toggleSubscribeData: null,
  isError: false,
  errorMessage: "",
};
const toggleSubscribeSlice = createSlice({
  name: "toggleSubscribe",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(toggleSubscribe.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(toggleSubscribe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.toggleSubscribeData = action.payload;
    });
    builder.addCase(toggleSubscribe.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
});

export default toggleSubscribeSlice.reducer;