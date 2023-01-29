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
      transformResponse: (response) => response.message,
      transformErrorResponse: (error) => error.data.message,
    }),
    recoverToken: builder.mutation({
      query: (body) => ({
        url: "/auth/validate-recover-token",
        method: "POST",
        body: JSON.stringify(body),
      }),
      transformResponse: (response) => response.message,
      transformErrorResponse: (error) => error.data.message,
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: JSON.stringify(body),
      }),
      transformResponse: (response) => response.message,
      transformErrorResponse: (error) => error.data.message,
    }),
    userProfile: builder.query({
      query: (body) => ({
        url: "/user",
        method: "GET",
        body: JSON.stringify(body),
      }),
      providesTags: ["user"],
      transformResponse: (response) => response.body.user,
      transformErrorResponse: (error) => error.data.message,
    }),
    otherUserProfile: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      transformResponse: (response) => response.body.user,
      transformErrorResponse: (error) => error.data.message,
    }),
    userProfileUpdate: builder.mutation({
      query: (form) => ({
        url: "/user/edit",
        method: "PATCH",
        headers: {
          "Content-Type": "multipart/form-data",
        },

        body: form,
      }),
      invalidatesTags: ["user"],
      transformResponse: (response) => response.message,
      transformErrorResponse: (error) => error.data.message,
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/user/logout",
        method: "POST",
      }),

      transformResponse: (response) => response.message,
      transformErrorResponse: (error) => error.data.message,
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useUserProfileQuery,
  useLogoutMutation,
  useOtherUserProfileQuery,
  useResetPasswordMutation,
  useUserProfileUpdateMutation,
  useRecoverTokenMutation,
} = authSlice;
