import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  post: {},
  loading: false,
};

export const postSlices = createSlice({
  name: "posts",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    createPost: (state, action) => {
      state.posts.push(action.payload);
    },
  },
});

export const { createPost } = postSlices.actions;

export default postSlices.reducer;
