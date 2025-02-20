import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/useApi";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

// Thunk action to log out
export const logout = createAsyncThunk("logout", async () => {

  try {
    // Call the logout endpoint on the backend
    const response = await api.post("/users/logout/", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // On successful logout, remove tokens from cookies
    cookies.remove("accessToken", { path: "/" });
    cookies.remove("refreshToken", { path: "/" });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;  // Provide error message from backend
    } else {
      throw error;  // Handle other errors
    }
  }
});

const initialState = {
  isLoading: false,
  logoutData: null,
  isError: false,
  errorMessage: "",
};

const logoutSlice = createSlice({
  name: "logout",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoading = false;
      state.logoutData = action.payload;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
});

export default logoutSlice.reducer;
