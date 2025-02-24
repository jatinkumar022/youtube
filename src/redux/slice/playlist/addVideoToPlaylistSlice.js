import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/useApi";

export const addVideoToPlaylist = createAsyncThunk("addVideoToPlaylist", async (data) => {
  try {

    const response = await api.patch(
      `/playlist/add/${data.videoId}/${data.playlistId}`,

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
  addVideoToPlaylistData: null,
  isError: false,
  errorMessage: "",
};
const addVideoToPlaylistSlice = createSlice({
  name: "addVideoToPlaylist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addVideoToPlaylist.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addVideoToPlaylist.fulfilled, (state, action) => {
      state.isLoading = false;
      state.addVideoToPlaylistData = action.payload;
    });
    builder.addCase(addVideoToPlaylist.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
});

export default addVideoToPlaylistSlice.reducer;