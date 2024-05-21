import { createApi, retry } from "@reduxjs/toolkit/query/react";
import { LoginRequest, RegisterRequest, RegisterResponse } from "./types";
import customFetchApi from "./customFetchApi";
import { LoginResponse } from "../api/types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: customFetchApi,
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
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = authApi;
