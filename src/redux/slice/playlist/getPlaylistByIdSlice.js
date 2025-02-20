import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/useApi";

export const getPlaylistById = createAsyncThunk("getPlaylistById", async (playlistId) => {
  try {

    const response = await api.get(
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
  getPlaylistByIdData: null,
  isError: false,
  errorMessage: "",
};
const getPlaylistByIdSlice = createSlice({
  name: "getPlaylistById",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPlaylistById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPlaylistById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.getPlaylistByIdData = action.payload;
    });
    builder.addCase(getPlaylistById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
});

export default getPlaylistByIdSlice.reducer;