import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/useApi";

export const updateAvatar = createAsyncThunk("updateAvatar", async (data) => {
  try {

    const response = await api.patch("/users/avatar", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

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
  updateAvatarData: null,
  isError: false,
  errorMessage: "",
};
const updateAvatarSlice = createSlice({
  name: "updateAvatar",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateAvatar.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateAvatar.fulfilled, (state, action) => {
      state.isLoading = false;
      state.updateAvatarData = action.payload;
    });
    builder.addCase(updateAvatar.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
});

export default updateAvatarSlice.reducer;