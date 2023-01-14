import { configureStore } from "@reduxjs/toolkit";
import authReducer from "redux/reducers/authReducer";
import postsReducer from "redux/reducers/postReducer";
import { api } from "redux/slices";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    posts: postsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  devTools: true,
});
