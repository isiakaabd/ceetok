import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getUserDetails, logoutAction } from "redux/reducers/authReducer";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BASE_URL,
  prepareHeaders: (headers, { getState, type, endpoint }) => {
    const token = getState().auth.token;
    if (endpoint !== "userProfileUpdate") {
      headers.append("Content-Type", "application/json");
    }
    if (endpoint === "createAds") {
      headers.delete("Content-Type", "application/json");
    }
    if (token) {
      headers.append("AUTHORIZATION", `Bearer ${token}`);
    }
  },
});

const baseQuerywithAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);
    const token = refreshResult?.data?.accessToken;
    if (token) {
      api.dispatch(getUserDetails(token));
      result = await baseQuery(args, api, extraOptions);
    } else {
      await baseQuery("/logout", api, extraOptions);
      api.dispatch(logoutAction());
    }
  }

  return result;
};

export const api = createApi({
  // reducerPath: "api",
  baseQuery: baseQuerywithAuth,
  tagTypes: [
    "post",
    "comment",
    "admin",
    "announcement",
    "user",
    "ads",
    "quote",
  ],
  endpoints: () => ({}),
});
