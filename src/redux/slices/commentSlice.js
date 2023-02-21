import { api } from ".";

export const commentSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getPostComments: builder.query({
      query: ({ parentId, limit, type }) => ({
        url: `/comment?parent_type=${
          type ? type : "posts"
        }&parent_id=${parentId}&limit=${limit ? limit : 10}`,
        method: "GET",
      }),
      providesTags: ["comment"],
      transformResponse: (response) => response.body.comments,
      transformErrorResponse: (error) => error.data.message,
    }),
    postComment: builder.mutation({
      query: (body) => ({
        url: `/comment`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["comment", "post", "admin"],
      transformResponse: (response) => response.message,
      transformErrorResponse: (error) => error.data.message,
    }),
    editComment: builder.mutation({
      query: (body) => ({
        url: `/comment`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["comment", "post", "admin"],
      transformResponse: (response) => response.message,
      transformErrorResponse: (error) => error.data.message,
    }),
    deleteComment: builder.mutation({
      query: (body) => ({
        url: `/comment`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["comment", "post"],
      transformErrorResponse: (error) => error.data.message,
    }),
    updateComment: builder.mutation({
      query: (body) => ({
        url: `/comment`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["comment", "post"],
      transformErrorResponse: (error) => error.data.message,
      transformResponse: (response) => response.message,
    }),
    getSingleComment: builder.query({
      query: (id) => ({
        url: `/comment/${id}`,
        method: "GET",
      }),
      providesTags: ["comment", "post"],

      transformErrorResponse: (error) => error.data.message,
      transformResponse: (response) => response.body.comment,
    }),
  }),
});

export const {
  useGetPostCommentsQuery,
  usePostCommentMutation,
  useDeleteCommentMutation,
  useEditCommentMutation,
  useLazyGetPostCommentsQuery,
  useUpdateCommentMutation,
  useGetSingleCommentQuery,
} = commentSlice;
