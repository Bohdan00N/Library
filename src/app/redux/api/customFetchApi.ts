import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store";
import { refreshTokenRequest, refreshTokenResponse } from "./types";
import { logOut } from "../features/authSlice";
import { toast } from "react-toastify";
import Notiflix from "notiflix";

const baseUrl = "https://bookread-backend.goit.global";

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const refreshTokens = async (sid: string): Promise<refreshTokenResponse> => {
  const localStorageData = JSON.parse(localStorage.getItem("user") || "{}");
  const refreshToken = localStorageData.refreshToken;

  const response = await fetch(`${baseUrl}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${refreshToken}`,
    },
    body: JSON.stringify({ sid } as refreshTokenRequest),
  });

  if (!response.ok) {
    throw new Error("Failed to refresh token");
  }

  const data: refreshTokenResponse = await response.json();

  localStorageData.accessToken = data.newAccessToken;
  localStorageData.refreshToken = data.newRefreshToken;
  localStorageData.sid = data.newSid;
  localStorage.setItem("user", JSON.stringify(localStorageData));

  return data;
};

const REFRESH_TOKEN_INTERVAL = 2 * 60 * 1000;
let refreshTokenTimeoutId: number | null = null;

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const localStorageData = JSON.parse(localStorage.getItem("user") || "{}");

  try {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
      const sid = localStorageData.sid;
      if (sid) {
        try {
          const newTokens = await refreshTokens(sid);
          localStorageData.accessToken = newTokens.newAccessToken;
          localStorage.setItem("user", JSON.stringify(localStorageData));
          api.dispatch({ type: "auth/refresh", payload: newTokens });
          result = await baseQuery(args, api, extraOptions);

          if (refreshTokenTimeoutId !== null) {
            clearTimeout(refreshTokenTimeoutId);
          }
          refreshTokenTimeoutId = window.setTimeout(
            async () => {
              try {
                const updatedTokens = await refreshTokens(sid);
                localStorageData.accessToken = updatedTokens.newAccessToken;
                localStorage.setItem("user", JSON.stringify(localStorageData));
                api.dispatch({ type: "auth/refresh", payload: updatedTokens });
              } catch (error) {
                console.log("Error refreshing token:", error);
                api.dispatch(logOut());
                toast.success("Logout success");
                if (refreshTokenTimeoutId !== null) {
                  clearTimeout(refreshTokenTimeoutId);
                  refreshTokenTimeoutId = null;
                }
              }
            },
            REFRESH_TOKEN_INTERVAL
          );
        } catch (error) {
          console.log("Error refreshing token:", error);
          api.dispatch(logOut());
          toast.success("Logout success");
          if (refreshTokenTimeoutId !== null) {
            clearTimeout(refreshTokenTimeoutId);
            refreshTokenTimeoutId = null;
          }
        }
      } else {
        api.dispatch(logOut());
        toast.success("Logout success");
        if (refreshTokenTimeoutId !== null) {
          clearTimeout(refreshTokenTimeoutId);
          refreshTokenTimeoutId = null;
        }
      }
    }

    if (result.error && result.error.status === 403) {
      Notiflix.Notify.failure("Email doesn't exist / Password is wrong")
     
    }
 
    return result;
  } catch (error) {
    console.error("Error occurred in baseQueryWithReauth:", error);
    throw error;
  }
};

export default baseQueryWithReauth;