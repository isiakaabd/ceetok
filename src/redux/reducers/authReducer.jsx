import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  loading: false,
  auth: false,
  token: localStorage.getItem("access_token") || null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    loginAction: (state, action) => {
      state.auth = true;
      localStorage.setItem("access_token", action.payload.auth.accessToken);
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.user = action.payload;
      state.token = action.payload.auth.accessToken;
    },
    registerAction: (state, action) => {
      // localStorage.setItem("access_token", action.payload.auth.accessToken);
      state.user = action.payload;
    },
    logoutAction: (state, action) => {
      localStorage.clear();
      state.token = null;
      state.user = {};
    },
  },
});

const { reducer, actions } = authSlice;
export const { registerAction, loginAction, logoutAction } = actions;
export const loginState = (state) => state.auth;
export const registerState = (state) => state.register;
export const userProfile = (state) => state.user;

export default reducer;
