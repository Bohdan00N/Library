import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchApi from "./customFetchApi";
export const planningApi = createApi({
    reducerPath: "planningApi",
    baseQuery: customFetchApi,
    endpoints: (builder) => ({
        startPlan: builder.mutation({
            query(data) {
                return {
                    url: "/planning",
                    method: "POST",
                    body: data,
                };
            },
        }),
        addRead: builder.mutation({
            query(data) {
                return {
                    url: "/planning",
                    method: "PATCH",
                    body: data,
                };
            },
        }),
        currentPlan: builder.mutation({
            query() {
                return {
                    url: "/planning",
                    method: "GET",
                };
            },
        }),
    }),
});
export const { useStartPlanMutation, useAddReadMutation, useCurrentPlanMutation, } = planningApi;
