import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/useApi";

export const getSubscribedChannels = createAsyncThunk("getSubscribedChannels", async () => {
  try {
    const response = await api.get(
      `/subscriptions/channels`
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
  getSubscribedChannelsData: null,
  isError: false,
  errorMessage: "",
};
const getSubscribedChannelsSlice = createSlice({
  name: "getSubscribedChannels",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSubscribedChannels.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSubscribedChannels.fulfilled, (state, action) => {
      state.isLoading = false;
      state.getSubscribedChannelsData = action.payload;
    });
    builder.addCase(getSubscribedChannels.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
});

export default getSubscribedChannelsSlice.reducer;