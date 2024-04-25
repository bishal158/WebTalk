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
export const getAllPosts = createAsyncThunk(
  "post/getAllPosts",
  async (arg, thunkAPI) => {
    try {
      const posts = await axios.get(base_url + "/user/getAllPost");
      return posts.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);
export const getFilteredPosts = createAsyncThunk(
  "post/getFilteredPosts",
  async (category, thunkAPI) => {
    try {
      const posts = await axios.get(
        base_url + `/user/getFilteredPosts/?category=${category}`,
      );
      return posts.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);
export const getSinglePost = createAsyncThunk(
  "post/getSinglePost",
  async (id, thunkAPI) => {
    console.log(id);
    try {
      const postInfo = await axios.get(base_url + `/user/getSinglePost/${id}`);
      return postInfo.data;
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
    postInfo: null,
    posts: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    /** save a post **/
    builder
      .addCase(savePost.pending, (state, action) => {
        state.isLoading = true;
        state.success = false;
        state.error = null;
        state.posts = [];
      })
      .addCase(savePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.error = null;
        state.posts = action.payload;
      })
      .addCase(savePost.rejected, (state, action) => {
        state.error = action.payload;
        state.success = false;
        state.error = null;
        state.posts = [];
      })
      /** fetch all posts **/
      .addCase(getAllPosts.pending, (state, action) => {
        state.posts = [];
        state.success = false;
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.error = null;
        state.posts = action.payload;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.posts = [...state.posts];
        state.error = action.payload;
      })
      /** filtered Posts **/
      .addCase(getFilteredPosts.pending, (state, action) => {
        state.posts = [...state.posts];
        state.success = false;
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getFilteredPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.error = null;
        state.posts = action.payload;
      })
      .addCase(getFilteredPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.posts = [...state.posts];
        state.error = action.payload;
      })
      .addCase(getSinglePost.pending, (state, action) => {
        state.posts = [...state.posts];
        state.success = false;
        state.error = null;
        state.isLoading = true;
        state.postInfo = null;
      })
      .addCase(getSinglePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.error = null;
        state.posts = [...state.posts];
        state.postInfo = action.payload;
      })
      .addCase(getSinglePost.rejected, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.posts = [...state.posts];
        state.error = action.payload;
        state.postInfo = null;
      });
  },
});
export default postSlice.reducer;
