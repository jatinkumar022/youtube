import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { API_KEY } from "../../../enviroment"
export const signIn = createAsyncThunk("signIn", async (data) => {
  try {

    const response = await axios.post(
      `${API_KEY}/users/register`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Axios will automatically manage boundary
        }
      },
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
  signInData: null,
  isError: false,
  errorMessage: "",
};
const signInSlice = createSlice({
  name: "signIn",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isLoading = false;
      state.signInData = action.payload;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
});

export default signInSlice.reducer;