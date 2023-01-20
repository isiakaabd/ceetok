import { api } from ".";

export const authSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body: JSON.stringify(body),
      }),
      transformErrorResponse: (error) => error.data.message,
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body: JSON.stringify(body),
      }),
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/auth/init-reset-password",
        method: "POST",
        body: JSON.stringify(body),
      }),
      transformErrorResponse: (error) => error.data.message,
    }),
    userProfile: builder.query({
      query: (body) => ({
        url: "/user",
        method: "GET",
        body: JSON.stringify(body),
      }),
      transformResponse: (response) => response.body.user,
      transformErrorResponse: (error) => error.data.message,
    }),
    userProfileUpdate: builder.mutation({
      query: (body) => ({
        url: "/user/edit",
        method: "PATCH",
        body: JSON.stringify(body),
      }),
      // transformResponse: (response) => response.body.user,
      // transformErrorResponse: (error) => error.data.message,
    }),

    logout: builder.mutation({
      query: () => ({
        url: "user/logout",
        method: "POST",
      }),
      // transformResponse: (response) => response.body.user,
      // transformErrorResponse: (error) => error.data.message,
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useUserProfileQuery,
  useLogoutMutation,
  useUserProfileUpdateMutation,
} = authSlice;
