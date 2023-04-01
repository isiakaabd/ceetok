import { api } from ".";

export const adminSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    approvePost: builder.mutation({
      query: (body) => ({
        url: `/admin/post/approve`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["admin", "post"],
      transformResponse: (response) => response.message,
      transformErrorResponse: (error) => error.data.message,
    }),
    approveAnnoucement: builder.mutation({
      query: (body) => ({
        url: `/admin/announcement/approve`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["admin", "announcement"],
      transformResponse: (response) => response.message,
      transformErrorResponse: (error) => error.data.message,
    }),
    sendMail: builder.mutation({
      query: (body) => ({
        url: `/admin/user/send-email`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["admin"],
      transformResponse: (response) => response.message,
      transformErrorResponse: (error) => error.data.message,
    }),
    getUsers: builder.query({
      query: (body) => ({
        url: `/admin/user/`,
        method: "GET",
      }),
      providesTags: ["admin"],
      transformResponse: (response) => response.body.users,
      // transformErrorResponse: (error) => error.data.message,
    }),
    banUsers: builder.mutation({
      query: (body) => ({
        url: `/admin/user/ban`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["user"],
      transformResponse: (response) => response.message,
      transformErrorResponse: (error) => error.data.message,
    }),
    sendEmail: builder.mutation({
      query: (body) => ({
        url: `/admin/user/send-email`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["user"],
      transformResponse: (response) => response.message,
      transformErrorResponse: (error) => error.data.message,
    }),
    livePost: builder.mutation({
      query: (body) => ({
        url: `/admin/live`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["admin"],
      transformResponse: (response) => response.message,
      transformErrorResponse: (error) => error.data.message,
    }),
    yellowCard: builder.mutation({
      query: (body) => ({
        url: `/admin/infraction/yellow-card`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["admin"],
      transformResponse: (response) => response.message,
      transformErrorResponse: (error) => error.message,
    }),
    deleteLivePost: builder.mutation({
      query: (body) => ({
        url: `/admin/live`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["admin"],
      transformResponse: (response) => response.message,
      transformErrorResponse: (error) => error.data.message,
    }),
    getLivePost: builder.query({
      query: (id) => ({
        url: `/live/${id}`,
        method: "GET",
      }),
      providesTags: ["admin"],
      transformResponse: (response) => response.body.post,
      transformErrorResponse: (error) => error.data.message,
    }),
    getLivePosts: builder.query({
      query: () => ({
        url: `/live`,
        method: "GET",
      }),
      providesTags: ["admin"],
      // transformResponse: (response) => response.body,
      transformErrorResponse: (error) => error.data.message,
    }),
    editLivePost: builder.mutation({
      query: (body) => ({
        url: `admin/live`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["admin"],
      transformResponse: (response) => response.message,
      transformErrorResponse: (error) => error.data.message,
    }),
  }),
});

export const {
  useApprovePostMutation,
  useGetUsersQuery,
  useLivePostMutation,
  useApproveAnnoucementMutation,
  useBanUsersMutation,
  useDeleteLivePostMutation,
  useGetLivePostsQuery,
  useYellowCardMutation,
  useSendMailMutation,
  useEditLivePostMutation,
  useSendEmailMutation,
  useGetLivePostQuery,
} = adminSlice;
