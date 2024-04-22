import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../constants/constants.js";

export const savePost = createAsyncThunk(
  "posts/savePost",
  async (postData, thunkAPI) => {
    try {
      const post = await axios.post(base_url + "/user/savePost", postData, {
        withCredentials: true,
      });
      return post.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

const postSlice = createSlice({
  name: "post",
  initialState: {
    isLoading: false,
    error: null,
    success: false,
    posts: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(savePost.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(savePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.posts = [action.payload];
      })
      .addCase(savePost.rejected, (state, action) => {
        state.error = action.payload;
        state.success = false;
        state.posts = [];
      });
  },
});
export default postSlice.reducer;
