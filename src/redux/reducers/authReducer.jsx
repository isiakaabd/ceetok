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
    login: (state, action) => {
      state.auth = true;
      localStorage.setItem("access_token", action.payload);
      state.user = action.payload;
    },
    registerAction: (state, action) => {
      localStorage.setItem("access_token", action.payload.auth.accessToken);
      state.user = action.payload;
    },
  },
});
console.log(authSlice.reducer.user);
const { reducer, actions } = authSlice;
export const { registerAction, login } = actions;
export const loginState = (state) => state.auth;
export const registerState = (state) => state.register;
export const userProfile = (state) => state.user;

export default reducer;
