import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getUserDetails, logOut } from "../reducers/authReducer";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://3.80.211.23:5050",

  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    headers.append("Content-Type", "application/json");

    if (token) {
      headers.append("AUTHORIZATION", `Bearer ${token}`);
    }
  },
});

const baseQuerywithAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.originalStatus === 403) {
    const refreshResult = await baseQuery("/refresh", api, extraOptions);

    if (refreshResult?.data) {
      // api.dispatch(getUserDetails(refreshResult));
      result = await baseQuery(args, api, extraOptions);
    } else {
      await baseQuery("/logout", api, extraOptions);
      // api.dispatch(logOut());
    }
  }

  return result;
};

export const api = createApi({
  // reducerPath: "api",
  baseQuery: baseQuerywithAuth,
  tagTypes: ["post", "comment", "announcement"],
  endpoints: () => ({}),
});
