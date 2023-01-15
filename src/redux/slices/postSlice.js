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
      query: (body) => ({
        url: "/post/upload-media",
        method: "POST",
        body,
      }),
    }),
    getAPost: builder.query({
      query: (postId) => ({
        url: `/post/${postId}`,
        method: "GET",
      }),
      providesTags: ["post"],
      // invalidatesTags: ["post"],
      transformResponse: (response) => response.body,
      // transformErrorResponse: (error) => error.data.message,
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetPostQuery,
  useAddImageMutation,
  useGetAPostQuery,
} = postSlice;
