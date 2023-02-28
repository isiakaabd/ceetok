import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getUserDetails, logoutAction } from "redux/reducers/authReducer";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BASE_URL,
  prepareHeaders: (headers, { getState, type, endpoint }) => {
    const token = getState().auth.token;
    if (endpoint !== "userProfileUpdate") {
      headers.set("Content-Type", "application/json");
    }
    if (endpoint === "createAds") {
      headers.delete("Content-Type", "application/json");
    }
    if (token) {
      headers.set("AUTHORIZATION", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQuerywithAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  const refreshToken = localStorage.getItem("refresh_token");
  // const header = {
  //   authorization: `bearer ${refreshToken}`,
  // };
  if (result?.error?.status === 403) {
    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh",
        method: "POST",
        headers: (header) => {
          header.set("authorization", `bearer ${refreshToken}`);
        },
      },
      api,
      extraOptions
    );
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
