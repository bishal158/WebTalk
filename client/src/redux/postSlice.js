import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../constants/constants.js";

//saving a post
export const savePost = createAsyncThunk(
  "posts/savePost",
  async (postData, thunkAPI) => {
    try {
      const post = await axios.post(base_url + "/post/savePost", postData, {
        withCredentials: true,
      });
      return post.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);
// getting trending posts
export const getTrendingPosts = createAsyncThunk(
  "posts/getTrendingPosts",
  async (postData, thunkAPI) => {
    try {
      const trendingPosts = await axios.get(base_url + "post/getTrendingPosts");
      return trendingPosts.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);
// getting all posts
export const getAllPosts = createAsyncThunk(
  "post/getAllPosts",
  async (arg, thunkAPI) => {
    try {
      const posts = await axios.get(base_url + "/post/getAllPost");
      return posts.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

// get all posts
export const getFilteredPosts = createAsyncThunk(
  "post/getFilteredPosts",
  async (category, thunkAPI) => {
    try {
      const posts = await axios.get(
        base_url + `/post/getFilteredPosts/?category=${category}`,
      );
      return posts.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

// get single post
export const getSinglePost = createAsyncThunk(
  "post/getSinglePost",
  async (id, thunkAPI) => {
    // console.log(id);
    try {
      const postInfo = await axios.get(base_url + `/post/getSinglePost/${id}`);
      return postInfo.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

// delete a single post
export const deleteSinglePost = createAsyncThunk(
  "post/deletePost",
  async (id, thunkAPI) => {
    console.log(id);
    try {
      const deletePost = await axios.delete(
        base_url + `/post/deletePost/${id}`,
        {
          withCredentials: true,
        },
      );
      return deletePost.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

// update a post
export const updatePost = createAsyncThunk(
  "post/updatePost",
  async (updatedData, thunkAPI) => {
    try {
      const updatedPost = await axios.put(
        base_url + `/post/updatePost/${updatedData.get("id")}`,
        updatedData,
        {
          withCredentials: true,
        },
      );
      return updatedPost.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

// like a post
export const likedPost = createAsyncThunk(
  "post/liked",
  async (id, thunkAPI) => {
    // console.log(id);
    try {
      const likedPost = await axios.put(
        base_url + `/post/likedPost/${id}`,
        {},
        {
          withCredentials: true,
        },
      );
      return likedPost.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);
// dislike a post

// save a comment of a post
export const saveComment = createAsyncThunk(
  "post/comment/saveComment",
  async (commentData, thunkAPI) => {
    try {
      const comment = await axios.post(
        base_url + `/post/comment/saveComment`,
        commentData,
        { withCredentials: true },
      );
      return comment.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

// post slice
const postSlice = createSlice({
  name: "post",
  initialState: {
    isLoading: false,
    error: null,
    success: false,
    postInfo: null,
    posts: [],
    liked: false,
    deleted: false,
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
        state.isLoading = false;
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
      /** get Single Post Info **/
      .addCase(getSinglePost.pending, (state, action) => {
        state.success = false;
        state.error = null;
        state.isLoading = true;
        state.postInfo = null;
      })
      .addCase(getSinglePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.error = null;
        state.postInfo = action.payload;
      })
      .addCase(getSinglePost.rejected, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.error = action.payload;
        state.postInfo = null;
      })
      /** delete this post **/
      .addCase(deleteSinglePost.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteSinglePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.deleted = true;
        state.postInfo = null;
      })
      .addCase(deleteSinglePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      /** update a post **/
      .addCase(updatePost.pending, (state, action) => {
        state.isLoading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = action.payload;
      })
      /** like this post **/
      .addCase(likedPost.pending, (state, action) => {
        state.isLoading = true;
        state.success = false;
        state.error = null;
        state.liked = false;
      })
      .addCase(likedPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.error = null;
        state.liked = true;
        state.postInfo = action.payload;
      })
      .addCase(likedPost.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = action.payload;
        state.liked = false;
      })
      /** save a comment **/
      .addCase(saveComment.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(saveComment.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(saveComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export default postSlice.reducer;
