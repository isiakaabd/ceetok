import { api } from ".";

export const commentSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getPostQuotes: builder.query({
      query: ({ parentId, type, offset }) => ({
        url: `/quote?parent_type=${
          type ? type : "posts"
        }&parent_id=${parentId}&limit=10&offset=${offset}`,
        method: "GET",
      }),
      providesTags: ["quote", "post"],
      transformResponse: (response) => response.body,
      transformErrorResponse: (error) => error.data.message,
    }),
    getUserQuotes: builder.query({
      query: (offset) => ({
        url: `/quote/user/?&limit=10&offset=${offset}`,
        method: "GET",
      }),
      providesTags: ["quote", "user"],
      transformResponse: (response) => response.body,
      transformErrorResponse: (error) => error.data.message,
    }),
    createQuote: builder.mutation({
      query: (body) => ({
        url: `/quote`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["quote"],
      transformResponse: (response) => response.message,
      transformErrorResponse: (error) => error.data.message,
    }),
    deleteQuote: builder.mutation({
      query: (body) => ({
        url: `/quote`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["quote"],
      transformResponse: (response) => response.message,
      transformErrorResponse: (error) => error.data.message,
    }),

    editQuote: builder.mutation({
      query: (body) => ({
        url: `/quote`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["quote"],
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
  useGetPostQuotesQuery,
  useGetUserQuotesQuery,
} = commentSlice;
