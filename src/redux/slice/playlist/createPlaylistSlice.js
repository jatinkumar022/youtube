import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/useApi";

export const createPlaylist = createAsyncThunk("createPlaylist", async (data) => {
  try {

    const response = await api.post(
      `/playlist/`,
      data,
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
  createPlaylistData: null,
  isError: false,
  errorMessage: "",
};
const createPlaylistSlice = createSlice({
  name: "createPlaylist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createPlaylist.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createPlaylist.fulfilled, (state, action) => {
      state.isLoading = false;
      state.createPlaylistData = action.payload;
    });
    builder.addCase(createPlaylist.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
});

export default createPlaylistSlice.reducer;