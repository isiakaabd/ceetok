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
    getUsers: builder.query({
      query: (body) => ({
        url: `/admin/user/`,
        method: "GET",
      }),
      providesTags: ["admin"],
      transformResponse: (response) => response.body.users,
      // transformErrorResponse: (error) => error.data.message,
    }),
  }),
});

export const {
  useApprovePostMutation,
  useGetUsersQuery,
  useApproveAnnoucementMutation,
} = adminSlice;
