// src/store/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUser, getUserDetails } from "./authActions";
import { AuthState } from "@/types/redux";

let token: string | null = null;
if (typeof localStorage !== "undefined") {
  token = localStorage.getItem("token") ?? null;
}

const initialState: AuthState = {
  loading: false,
  email: null,
  name: null,
  token,
  error: null,
  success: false,
  isLoggedIn: !!token,
  isNewData: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.loading = false;
      state.email = null;
      state.name = null;
      state.token = null;
      state.error = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.token = payload.token;
        state.isLoggedIn = true;
        localStorage.setItem("token", payload.token);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.non_field_errors?.[0] || "Login failed";
        state.success = false;
      })
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserDetails.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.email = payload.email;
        state.name = payload.name;
      })
      .addCase(getUserDetails.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.detail || "Failed to fetch user details";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
