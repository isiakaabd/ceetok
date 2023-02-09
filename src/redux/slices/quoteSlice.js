import { api } from ".";

export const commentSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getPostQuotes: builder.query({
      query: ({ parentId, limit, type }) => ({
        url: `/quote?parent_type=${
          type ? type : "posts"
        }&parent_id=${parentId}&limit=${limit ? limit : 10}`,
        method: "GET",
      }),
      providesTags: ["quote", "comment"],
      transformResponse: (response) => response.body.quotes,
      transformErrorResponse: (error) => error.data.message,
    }),
    createQuote: builder.mutation({
      query: (body) => ({
        url: `/quote`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["quote", "comment"],
      transformResponse: (response) => response.message,
      transformErrorResponse: (error) => error.data.message,
    }),
    deleteQuote: builder.mutation({
      query: (body) => ({
        url: `/quote`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["quote", "comment"],
      transformResponse: (response) => response.message,
      transformErrorResponse: (error) => error.data.message,
    }),

    editQuote: builder.mutation({
      query: (body) => ({
        url: `/quote`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["comment", "quote"],
      transformResponse: (response) => response.message,
      transformErrorResponse: (error) => error.data.message,
    }),
  }),
});

export const {
  useLazyGetPostQuotesQuery,
  useCreateQuoteMutation,
  useDeleteQuoteMutation,
  useEditQuoteMutation,
} = commentSlice;
