import { api } from ".";

export const postSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (body) => ({
        url: "/post",
        method: "POST",
        body: JSON.stringify(body),
      }),
      invalidatesTags: ["post"],
      transformResponse: (response) => response.message,
      transformErrorResponse: (error) => error.data.message,
    }),
    getPost: builder.query({
      query: ({
        category,
        latest,
        recent,
        userId,
        offset,
        approved,
        from,
        direction,
        //  ${`&approved=${approved}`}
      }) => ({
        url: `post/?${offset ? `&offset=${offset}` : "&offset=0"}&limit=10
        ${category ? `&category=${category}` : ""}${
          from ? `&from=${from}` : ""
        }${approved ? `&approved=${approved}` : ""}     
        ${userId ? `&user_id=${userId}` : ""} ${
          direction ? `&from_direction=${direction}` : ""
        } 
         ${latest ? `&latest=${latest}` : ""}   ${
          recent ? `&recent=${recent}` : ""
        } 
        
        `,

        method: "GET",
      }),
      // keepUnusedDataFor: 5000,
      providesTags: ["post"],
      transformResponse: (response) => response.body,
      // transformErrorResponse: (error) => error.data.message,
    }),
    addImage: builder.mutation({
      query: (body) => ({
        url: "/post/upload-media",
        method: "POST",
        body: JSON.stringify(body),
      }),
      invalidatesTags: ["post"],
      transformErrorResponse: (error) => error.data.message,
    }),
    reportPost: builder.mutation({
      query: (body) => ({
        url: "/report",
        method: "POST",
        body: JSON.stringify(body),
      }),
      invalidatesTags: ["post", "comment"],
      transformResponse: (response) => response.message,
      transformErrorResponse: (error) => error.data.message,
    }),
    getAPost: builder.query({
      query: (postId) => ({
        url: `/post/${postId}`,
        method: "GET",
      }),
      providesTags: ["post"],
      // invalidatesTags: ["post"],
      transformResponse: (response) => response.body.post,
      transformErrorResponse: (error) => error.data.message,
    }),
    getCategories: builder.query({
      query: () => ({
        url: `/category/`,
        method: "GET",
      }),

      providesTags: ["post"],
      transformResponse: (response) => response.body.categories,
      // transformErrorResponse: (error) => error.data.message,
    }),
    deleteAPost: builder.mutation({
      query: (body) => ({
        url: `/post`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["post"],
      transformResponse: (response) => response.message,
      transformErrorResponse: (error) => error.data.message,
    }),
    editAPost: builder.mutation({
      query: (body) => ({
        url: `/post`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["post"],
      transformResponse: (response) => response.message,
      transformErrorResponse: (error) => error.data.message,
    }),
    likeAndUnlikePost: builder.mutation({
      query: (body) => ({
        url: `/like`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["post", "announcement", "comment", "admin"],
      transformErrorResponse: (error) => error.data.message,
    }),
    getLikes: builder.query({
      query: ({ type, parentId }) => ({
        url: `/like?parent_type=${type}&parent_id=${parentId}`,
        method: "GET",
      }),
      providesTags: ["post", "comment", "announcement"],
      transformResponse: (response) => response.body.likes,
      transformErrorResponse: (error) => error.data.message,
    }),
    getViews: builder.query({
      query: ({ type, parentId }) => ({
        url: `/view?parent_type=${type}&parent_id=${parentId}`,
        method: "GET",
      }),
      providesTags: ["post"],
      transformResponse: (response) => response.body.views,
      transformErrorResponse: (error) => error.data.message,
    }),
    addQuote: builder.mutation({
      query: (body) => ({
        url: "quote",
        method: "POST",
        body,
      }),
      providesTags: ["post"],
      // transformResponse: (response) => response.body.views,
      // transformErrorResponse: (error) => error.data.message,
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetPostQuery,
  useAddImageMutation,
  useGetAPostQuery,
  useAddQuoteMutation,
  useDeleteAPostMutation,
  useEditAPostMutation,
  useGetCategoriesQuery,
  useGetViewsQuery,
  useReportPostMutation,
  useLazyGetPostQuery,
  useLikeAndUnlikePostMutation,
  useGetLikesQuery,
} = postSlice;
