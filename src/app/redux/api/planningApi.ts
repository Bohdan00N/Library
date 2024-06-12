import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchApi from "./customFetchApi";
import {
  addPlanningRequest,
  addPlanningResponse,
  startPlanningRequest,
  startPlanningResponse,
} from "./types";

export const planningApi = createApi({
  reducerPath: "planningApi",
  baseQuery: customFetchApi,
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
    currentPlan: builder.mutation<startPlanningResponse, string>({
      query() {
        return {
          url: "/planning",
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useStartPlanMutation,
  useAddReadMutation,
  useCurrentPlanMutation,
} = planningApi;
