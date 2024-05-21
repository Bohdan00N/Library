import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchApi from "./customFetchApi";
import {
  addBookRequest,
  addBookResponse,
  startPlanningRequest,
  startPlanningResponse,
} from "./types";


export const planningApi = createApi({
  reducerPath: "planningApi",
  baseQuery: customFetchApi,
  tagTypes: ["plan"],
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
    addRead: builder.mutation<addBookResponse, addBookRequest>({
      query(data) {
        return {
          url: "/planning",
          method: "PATCH",
          body: data,
        };
      },
    }),
    currentPlan: builder.mutation<void, startPlanningResponse>({
      query() {
        return {
          url: "/planning",
          method: "GET",
        };
      },
    }),
  }),
});
