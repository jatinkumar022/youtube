import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/useApi";

export const getUserPlaylists = createAsyncThunk("getUserPlaylists", async (userId) => {
  try {

    const response = await api.get(
      `/playlist/user/${userId}`,

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
  getUserPlaylistsData: null,
  isError: false,
  errorMessage: "",
};
const getUserPlaylistsSlice = createSlice({
  name: "getUserPlaylists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserPlaylists.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserPlaylists.fulfilled, (state, action) => {
      state.isLoading = false;
      state.getUserPlaylistsData = action.payload;
    });
    builder.addCase(getUserPlaylists.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
});

export default getUserPlaylistsSlice.reducer;