import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/useApi";

export const removeVideoFromPlaylist = createAsyncThunk("removeVideoFromPlaylist", async (data) => {
  try {

    const response = await api.patch(
      `/playlist/remove/${data.videoId}/${data.playlistId}`,

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
  removeVideoFromPlaylistData: null,
  isError: false,
  errorMessage: "",
};
const removeVideoFromPlaylistSlice = createSlice({
  name: "removeVideoFromPlaylist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(removeVideoFromPlaylist.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(removeVideoFromPlaylist.fulfilled, (state, action) => {
      state.isLoading = false;
      state.removeVideoFromPlaylistData = action.payload;
    });
    builder.addCase(removeVideoFromPlaylist.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
});

export default removeVideoFromPlaylistSlice.reducer;