import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../constants/constants.js";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(base_url + "/user/register", userData);
      return response.data; // Handle success response (e.g., token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data); // Handle errors
    }
  },
);
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(base_url + "/user/login", userData);
      return response.data; // Handle success response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message.data);
    }
  },
);
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    error: null,
    success: false,
    userInfo: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
        state.userInfo = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.success = true;
        state.userInfo = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
        state.userInfo = null;
      });
  },
});

export default authSlice.reducer;
