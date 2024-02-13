import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export interface IPost {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

interface PostsState {
  posts: IPost[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  status: "idle",
  error: ''
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get("http://localhost:5000/posts");
  return response.data;
});

export const updatePost = createAsyncThunk<IPost, { id: number; title: string; content: string }>(
  "posts/updatePost",
  async (postData) => {
    const response = await axios.put(`http://localhost:5000/posts/${postData.id}`, postData);
    return response.data;
  }
);

export const deletePost = createAsyncThunk<number, number>(
  "posts/deletePost",
  async (postId) => {
    await axios.delete(`http://localhost:5000/posts/${postId}`);
    return postId;
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(updatePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = state.posts.map(post => {
          if (post.id === action.payload.id) {
            return action.payload;
          }
          return post;
        });
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || 'Failed to update post';
      })
      .addCase(deletePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = state.posts.filter(post => post.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || 'Failed to delete post';
      });
  }
});

export const selectAllPosts = (state: RootState) => state.posts.posts;
export const selectPostById = (postId: number) => (state: RootState) =>
  state.posts.posts.find(post => post.id === postId);

export default postsSlice.reducer;
export type { PostsState }
