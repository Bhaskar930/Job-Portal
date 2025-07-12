// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Get user from localStorage if it exists
const storedUser = localStorage.getItem("job-user");
const initialUser = storedUser ? JSON.parse(storedUser) : null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: initialUser,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAuthUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("job-user", JSON.stringify(action.payload)); // save user to localStorage
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("job-user"); // remove from localStorage
    },
  },
});

export const { setLoading, setAuthUser, logout } = authSlice.actions;
export default authSlice.reducer;
