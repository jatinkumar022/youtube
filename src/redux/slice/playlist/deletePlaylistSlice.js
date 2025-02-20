import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/useApi";

export const deletePlaylist = createAsyncThunk("deletePlaylist", async (playlistId) => {
  try {

    const response = await api.delete(
      `/playlist/${playlistId}`,

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
  deletePlaylistData: null,
  isError: false,
  errorMessage: "",
};
const deletePlaylistSlice = createSlice({
  name: "deletePlaylist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deletePlaylist.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deletePlaylist.fulfilled, (state, action) => {
      state.isLoading = false;
      state.deletePlaylistData = action.payload;
    });
    builder.addCase(deletePlaylist.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
});

export default deletePlaylistSlice.reducer;