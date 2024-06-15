import { fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store";
import {UseRefreshToken} from '../../../hooks/takeRefreshToken'

const baseUrl = "https://bookread-backend.goit.global";

const customFetchApi = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth: typeof customFetchApi = async (args, api, extraOptions) => {
  let result = await customFetchApi(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = UseRefreshToken();
    console.log(refreshToken);
    try {
      const newToken = await refreshToken();

      if (newToken) {
        api.dispatch({ type: 'auth/refresh', payload: newToken });

        result = await customFetchApi(args, api, extraOptions);
      }
    } catch (error) {
      console.error("Failed to refresh token", error);
    }
  }

  return result;
};

export default baseQueryWithReauth;



