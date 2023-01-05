import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  loading: false,
  auth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    login: (state, action) => {
      state.auth = true;
      state.user = action.payload;
    },
    register: (state, action) => {
      state.value = true;
      localStorage.setItem("user", action.payload);
    },
  },
});

export const { register, login } = authSlice.actions;

export const loginState = (state) => state.auth;
export const registerState = (state) => state.register;

export default authSlice.reducer;
