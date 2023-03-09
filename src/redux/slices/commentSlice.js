import { api } from ".";

export const commentSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getPostComments: builder.query({
      query: ({ parentId, offset, type }) =>
        `/comment?parent_type=${
          type ? type : "posts"
        }&parent_id=${parentId}&offset=${offset}&limit=10`,

      // serializeQueryArgs: ({ endpointName }) => {
      //   return endpointName;
      // },
      // // Always merge incoming data to the cache entry
      // merge: (currentCache, newItems, arg) => {
      //   console.log(newItems, arg);
      //   return newItems[0].parentId === arg.parentId
      //     ? currentCache?.comments?.push(...newItems?.comments)
      //     : null;
      // },
      // Refetch when the page arg changes
      // forceRefetch({ currentArg, previousArg }) {
      //   return currentArg !== previousArg;
      // },
      // providesTags: (result, error, arg) =>
      // console.log(result, arg),
      //  [
      //   { type: "comment", id: arg.parentId },
      // ],
      // providesTags: (result, error, arg) => {
      //   console.log(result, error, arg);
      //   return [
      //     { type: "comment", id: arg?.parentId },
      //     ...result.comments.map(({ parent_id }) => ({
      //       type: "comment",

      //       id: parent_id,
      //     })),
      //   ];
      // },
      providesTags: ["comment", "post"],
      transformResponse: (response) => response.body,
      transformErrorResponse: (error) => error.data.message,
    }),
    postComment: builder.mutation({
      query: (body) => ({
        url: `/comment`,
        method: "POST",
        body,
      }),

      invalidatesTags: ["comment", "post"],
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
      invalidatesTags: ["comment"],
      transformErrorResponse: (error) => error.data.message,
    }),
    updateComment: builder.mutation({
      query: (body) => ({
        url: `/comment`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["comment"],
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
