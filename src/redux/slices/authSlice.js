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
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/auth/init-reset-password",
        method: "POST",
        body: JSON.stringify(body),
      }),
      transformErrorResponse: (error) => error.data.message,
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      transformErrorResponse: (error) => error.data.message,
      // invalidatesTags: ["GenerateEndPoint"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useForgotPasswordMutation,
} = authSlice;
