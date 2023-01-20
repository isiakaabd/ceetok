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
      query: ({ category }) => ({
        url: `post/${
          category ? `?category=${category}&limit=10&offset=2` : ""
        }`,
        method: "GET",
      }),
      providesTags: ["post"],
      transformResponse: (response) => response.body.posts,
      // transformErrorResponse: (error) => error.data.message,
    }),
    addImage: builder.mutation({
      query: (form) => ({
        url: "/post/upload-media",
        method: "POST",
        body: form,
        headers: (headers) => {
          headers.delete("Content-Type", "application/json");
          headers.append("Content-type", "multipart/form-data");
        },
      }),
    }),
    getAPost: builder.query({
      query: (postId) => ({
        url: `/post/${postId}`,
        method: "GET",
      }),
      providesTags: ["post"],
      // invalidatesTags: ["post"],
      transformResponse: (response) => response.body.post,
      // transformErrorResponse: (error) => error.data.message,
    }),
    getCategories: builder.query({
      query: () => ({
        url: `/category/`,
        method: "GET",
      }),

      // invalidatesTags: ["post"],
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
      invalidatesTags: ["post"],
      // transformResponse: (response) => response.message,
      transformErrorResponse: (error) => error.data.message,
    }),
    getLikes: builder.query({
      query: ({ type, parentId }) => ({
        url: `/like?parent_type=${type}&parent_id=${parentId}`,
        method: "GET",
      }),
      invalidatesTags: ["post"],
      // transformResponse: (response) => response.message,
      // transformErrorResponse: (error) => error.data.message,
    }),
    getViews: builder.query({
      query: ({ type, parentId }) => ({
        url: `/view?parent_type=${type}&parent_id=${parentId}`,
        method: "GET",
      }),
      providesTags: ["post"],
      // transformResponse: (response) => response.message,
      // transformErrorResponse: (error) => error.data.message,
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetPostQuery,
  useAddImageMutation,
  useGetAPostQuery,
  useDeleteAPostMutation,
  useEditAPostMutation,
  useGetCategoriesQuery,
  useGetViewsQuery,
  useLikeAndUnlikePostMutation,
  useGetLikesQuery,
} = postSlice;
