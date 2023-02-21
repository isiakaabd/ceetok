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
      invalidatesTags: ["user", "post", "announcement", "admin"],
      transformErrorResponse: (error) => error.message,
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
    listUsers: builder.query({
      query: ({ username }) => ({
        url: `/user/list/?${username ? `username=${username}` : ""}`,
        method: "GET",
      }),
      providesTags: ["user"],
      transformResponse: (response) => response.body.users,
      transformErrorResponse: (error) => error.data.message,
    }),

    allUsers: builder.query({
      query: ({ username, followers }) => ({
        url: `/user/list/`,
        method: "GET",
      }),
      // transformResponse: (response) => response.body.users,
      transformErrorResponse: (error) => error.data.message,
    }),
    // /${username ? `?username=${username}` : ""}${
    //   followers ? `&followed=true` : ""
    // }
    followUser: builder.mutation({
      query: (body) => ({
        url: `/follow `,
        method: "POST",
        body,
      }),
      invalidatesTags: ["user"],
      transformResponse: (response) => response.message,
      transformErrorResponse: (error) => error.message,
    }),
    getUserSettings: builder.query({
      query: () => ({
        url: `/user/setting`,
        method: "GET",
      }),
      providesTags: ["user"],
      transformResponse: (response) => response.body.settings,
      transformErrorResponse: (error) => error.message,
    }),
    updateUserSettings: builder.mutation({
      query: (body) => ({
        url: `/user/setting`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["user"],
      transformResponse: (response) => response.message,
      transformErrorResponse: (error) => error.message,
    }),
    blockUser: builder.mutation({
      query: (body) => ({
        url: `/follow/block`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["user"],
      transformResponse: (response) => response.message,
      transformErrorResponse: (error) => error.message,
    }),
    unBlockUser: builder.mutation({
      query: (body) => ({
        url: `/follow/unblock`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["user"],
      transformResponse: (response) => response.message,
      transformErrorResponse: (error) => error.message,
    }),
    allMedia: builder.query({
      query: (page) => ({
        url: `/media?limit=10&offset=${page ? page : 0}`,
        method: "GET",
      }),
      providesTags: ["user"],
      transformResponse: (response) => response.body,
      transformErrorResponse: (error) => error.data.message,
    }),
    userProfileUpdate: builder.mutation({
      query: (form) => ({
        url: "/user/edit",
        method: "PATCH",

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
      invalidatesTags: ["user", "post", "announcement", "admin"],
      transformResponse: (response) => response.message,
      transformErrorResponse: (error) => error.data.message,
    }),
    refreshTok: builder.mutation({
      query: () => ({
        url: "/user/logout",
        method: "POST",
      }),
      invalidatesTags: ["user", "post", "announcement", "admin"],
      transformResponse: (response) => response.message,
      transformErrorResponse: (error) => error.data.message,
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useBlockUserMutation,
  useListUsersQuery,
  useForgotPasswordMutation,
  useUserProfileQuery,
  useAllUsersQuery,
  useGetUserSettingsQuery,
  useLogoutMutation,
  useUpdateUserSettingsMutation,
  useUnBlockUserMutation,
  useFollowUserMutation,
  useAllMediaQuery,
  useOtherUserProfileQuery,
  useLazyOtherUserProfileQuery,
  useResetPasswordMutation,
  useUserProfileUpdateMutation,
  useRecoverTokenMutation,
} = authSlice;
