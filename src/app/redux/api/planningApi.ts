import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./customFetchApi";
import {
  addPlanningRequest,
  addPlanningResponse,
  startPlanningRequest,
  startPlanningResponse,
} from "./types";

export const planningApi = createApi({
  reducerPath: "planningApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    startPlan: builder.mutation<startPlanningResponse, startPlanningRequest>({
      query(data) {
        return {
          url: "/planning",
          method: "POST",
          body: data,
        };
      },
    }),
    addRead: builder.mutation<addPlanningResponse, addPlanningRequest>({
      query(data) {
        return {
          url: "/planning",
          method: "PATCH",
          body: data,
        };
      },
    }),
  }),
});

export const { useStartPlanMutation, useAddReadMutation } = planningApi;
