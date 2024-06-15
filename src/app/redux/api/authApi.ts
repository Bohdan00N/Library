import { createApi, retry } from "@reduxjs/toolkit/query/react";
import { LoginRequest, RegisterRequest, RegisterResponse, refreshTokenRequest, refreshTokenResponse } from "./types";
import baseQueryWithReauth from "./customFetchApi";
import { LoginResponse } from "../api/types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    registerUser: builder.mutation<RegisterResponse, RegisterRequest>({
      query(data) {
        return {
          url: "/auth/register",
          method: "POST",
          body: data,
        };
      },
    }),
    loginUser: builder.mutation<LoginResponse, LoginRequest>({
      query(data) {
        return {
          url: "/auth/login",
          method: "POST",
          body: data,
        };
      },
      extraOptions: {
        backoff: () => {
          retry.fail({ fake: "error" });
        },
      },
    }),
    refreshToken: builder.mutation<refreshTokenResponse, refreshTokenRequest>({
      query(data) {
        return {
          url: "/auth/refresh",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation, useRefreshTokenMutation } = authApi;
