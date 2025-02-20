import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/useApi";

export const updatePlaylist = createAsyncThunk("updatePlaylist", async (data) => {
  try {

    const response = await api.patch(
      `/playlist/${data.playlistId}`,
      data.content,
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
  updatePlaylistData: null,
  isError: false,
  errorMessage: "",
};
const updatePlaylistSlice = createSlice({
  name: "updatePlaylist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updatePlaylist.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updatePlaylist.fulfilled, (state, action) => {
      state.isLoading = false;
      state.updatePlaylistData = action.payload;
    });
    builder.addCase(updatePlaylist.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
});

export default updatePlaylistSlice.reducer;