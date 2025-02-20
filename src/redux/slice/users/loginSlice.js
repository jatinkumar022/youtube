import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY } from "../../../enviroment"

export const logIn = createAsyncThunk("logIn", async (data) => {
  try {

    const response = await axios.post(
      `${API_KEY}/users/login/`,
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
  logInData: null,
  isError: false,
  errorMessage: "",
};
const logInSlice = createSlice({
  name: "logIn",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logIn.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.isLoading = false;
      state.logInData = action.payload;
    });
    builder.addCase(logIn.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
});

export default logInSlice.reducer;