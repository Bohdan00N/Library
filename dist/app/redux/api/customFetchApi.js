import { fetchBaseQuery } from "@reduxjs/toolkit/query";
const baseUrl = "https://bookread-backend.goit.global";
const customFetchApi = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.accessToken;
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    },
});
export default customFetchApi;
