import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/lib/store";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL
  ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`
  : (() => {
      console.error("NEXT_PUBLIC_BACKEND_URL is not defined");
      return "http://localhost:8000/api/users";
    })();

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.token;

      if (token) {
        headers.set("Authorization", `Token ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: () => ({
        url: "/me",
        method: "GET",
      }),
    }),
    // You can add more authentication-related queries or mutations here (e.g., login, logout)
  }),
});

export const { useGetUserDetailsQuery } = authApi;
