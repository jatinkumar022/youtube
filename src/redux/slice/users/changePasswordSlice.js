import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/useApi";

export const changePassword = createAsyncThunk("changePassword", async (data) => {
  try {

    const response = await api.post("/users/change-password", data, {
      headers: {
        "Content-Type": "application/json",
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
  changePasswordData: null,
  isError: false,
  errorMessage: "",
};
const changePasswordSlice = createSlice({
  name: "changePassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(changePassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.changePasswordData = action.payload;
    });
    builder.addCase(changePassword.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
});

export default changePasswordSlice.reducer;