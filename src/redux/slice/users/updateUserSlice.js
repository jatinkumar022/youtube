import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/useApi";

export const updateUser = createAsyncThunk("updateUser", async (data) => {
  try {
    const response = await api.patch("/users/update-account", data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

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
  updateUserData: null,
  isError: false,
  errorMessage: "",
};
const updateUserSlice = createSlice({
  name: "updateUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.updateUserData = action.payload;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
});

export default updateUserSlice.reducer;