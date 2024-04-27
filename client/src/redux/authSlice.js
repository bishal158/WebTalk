import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../constants/constants.js";
import { Cookies } from "react-cookie";

const getUser = () => {
  let user = localStorage.getItem("userInfo");
  if (user) {
    return JSON.parse(user);
  } else {
    return null;
  }
};
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
      const response = await axios.post(base_url + "/user/login", userData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      return response.data; // Handle success response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (arg, thunkAPI) => {
    try {
      const response = await axios.post(base_url + "/user/logout");
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    error: null,
    success: false,
    userInfo: getUser(),
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // register //
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
      // login //
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
        state.userInfo = null;
        localStorage.setItem("userInfo", state.userInfo);
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.success = true;
        state.userInfo = action.payload;
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
        state.userInfo = null;
        localStorage.setItem("userInfo", state.userInfo);
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.userInfo = null;
        state.isLoading = false;
        state.error = null;
        state.success = action.payload;
        localStorage.removeItem("userInfo");
      });
  },
});

export default authSlice.reducer;
