import axios from "axios";
import { RootState } from "@/lib/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginReq, LoginRes, AuthErrorRes, UserDetailsRes } from "@/types/auth";

const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const loginUser = createAsyncThunk<
  LoginRes,
  LoginReq,
  { rejectValue: AuthErrorRes }
>("auth/loginUser", async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `${backendUrl}/api/user/token/`,
      { email, password },
      config
    );

    const { data } = response;

    return data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue({ non_field_errors: [error.message] });
    }
  }
});

export const getUserDetails = createAsyncThunk<
  UserDetailsRes,
  void,
  { state: RootState; rejectValue: AuthErrorRes }
>("auth/getUserDetails", async (_, { getState, rejectWithValue }) => {
  const state = getState() as RootState;
  const token = state.auth.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };

  try {
    const response = await axios.get(`${backendUrl}/api/user/me`, config);

    const { data } = response;
    return data as UserDetailsRes;
  } catch (error: any) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data as AuthErrorRes);
    } else {
      return rejectWithValue({ detail: error.message });
    }
  }
});
