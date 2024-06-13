import { createApi, retry } from "@reduxjs/toolkit/query/react";
import customFetchApi from "./customFetchApi";
export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: customFetchApi,
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query(data) {
                return {
                    url: "/auth/register",
                    method: "POST",
                    body: data,
                };
            },
        }),
        loginUser: builder.mutation({
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
