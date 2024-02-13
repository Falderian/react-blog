import { configureStore } from '@reduxjs/toolkit';
import userReducer, { UserState } from './users/userSlice';
import postsReducer, { PostsState } from './posts/postsSlice';

export interface RootState {
  user: UserState;
  posts: PostsState;
}

const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer
  }
});

export default store;
