import { api } from ".";

export const authSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body: JSON.stringify(body),
      }),
      // invalidatesTags: ["GenerateEndPoint"],
      // transformResponse: (response) => response.data,
      transformErrorResponse: (error) => error.data.message,
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body: JSON.stringify(body),
      }),

      // invalidatesTags: ["GenerateEndPoint"],
    }),
    // forgotPassword: builder.mutation({
    //   query: (body) => ({
    //     url: "/forgot-password-link",
    //     method: "POST",
    //     body: JSON.stringify(body),
    //   }),
    //   invalidatesTags: ["GenerateEndPoint"],
    // }),
    // forgotPasswordLinkConfirm: builder.mutation({
    //   query: (body) => ({
    //     url: "/forgot-password-link-confirm",
    //     method: "POST",
    //     body: JSON.stringify(body),
    //   }),
    //   invalidatesTags: ["GenerateEndPoint"],
    // }),
    // forgotPasswordLinkReset: builder.mutation({
    //   query: (body) => ({
    //     url: "/forgot-password-link-reset",
    //     method: "POST",
    //     body: JSON.stringify(body),
    //   }),

    //   invalidatesTags: ["GenerateEndPoint"],
    // }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),

      invalidatesTags: ["GenerateEndPoint"],
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authSlice;
