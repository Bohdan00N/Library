import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { RootState } from "../../store";

const baseUrl = "https://bookread-backend.goit.global";

const customFetchApi = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export default customFetchApi;
