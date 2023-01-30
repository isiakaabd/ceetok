import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://api.ceetok.live",

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
  tagTypes: ["post", "comment", "announcement", "user", "ads"],
  endpoints: () => ({}),
});
