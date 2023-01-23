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
      invalidatesTags: ["comment"],
      transformResponse: (response) => response.message,
      // transformErrorResponse: (error) => error.data.message,
    }),
    deleteComment: builder.mutation({
      query: (body) => ({
        url: `/comment`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["comment"],
      // transformResponse: (response) => response.message.data,
      transformErrorResponse: (error) => error.data.message,
    }),
  }),
});

export const {
  useGetPostCommentsQuery,
  usePostCommentMutation,
  useDeleteCommentMutation,
} = commentSlice;
