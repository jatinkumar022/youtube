import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/useApi";

export const getChannel = createAsyncThunk("getChannel", async (username) => {
  try {
    const response = await api.get(`/users/c/${username}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

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
  getChannelData: null,
  isError: false,
  errorMessage: "",
};
const getChannelSlice = createSlice({
  name: "getChannel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getChannel.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getChannel.fulfilled, (state, action) => {
      state.isLoading = false;
      state.getChannelData = action.payload;
    });
    builder.addCase(getChannel.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
});

export default getChannelSlice.reducer;