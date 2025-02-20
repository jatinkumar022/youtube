import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/useApi";

export const getChannelPlaylists = createAsyncThunk("getChannelPlaylists", async () => {
  try {

    const response = await api.get(
      `/playlist/channel/playlists`,

      {
        "Content-Type": "application/json",
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
  getChannelPlaylistsData: null,
  isError: false,
  errorMessage: "",
};
const getChannelPlaylistsSlice = createSlice({
  name: "getChannelPlaylists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getChannelPlaylists.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getChannelPlaylists.fulfilled, (state, action) => {
      state.isLoading = false;
      state.getChannelPlaylistsData = action.payload;
    });
    builder.addCase(getChannelPlaylists.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
});

export default getChannelPlaylistsSlice.reducer;