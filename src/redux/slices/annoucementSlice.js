import { api } from ".";

export const annoucementSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createAnnoucement: builder.mutation({
      query: (body) => ({
        url: `/announcement`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["announcement"],
      //   transformResponse: (response) => response.body.views,
      transformErrorResponse: (error) => error.data,
    }),
    editAnnoucement: builder.mutation({
      query: (body) => ({
        url: `/announcement`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["announcement"],
      transformResponse: (response) => response.message,
      transformErrorResponse: (error) => error.data.message,
    }),
    getAnnoucements: builder.query({
      query: ({ page }) => ({
        url: `announcement/?${page ? `&offset=${page}` : "&offset=0"}&limit=10`,
        method: "GET",
      }),
      providesTags: ["announcement"],
      transformResponse: (response) => response.body,
      transformErrorResponse: (error) => error.data.message,
    }),
    deleteAnnoucements: builder.mutation({
      query: (body) => ({
        url: `/announcement`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["announcement"],
      transformResponse: (response) => response.message,
      transformErrorResponse: (error) => error.data.message,
    }),
    getAnnoucement: builder.query({
      query: ({ id }) => ({
        url: `/announcement/${id}`,
        method: "GET",
      }),
      providesTags: ["announcement"],
      // transformResponse: (response) => response.message,
      transformErrorResponse: (error) => error.data.message,
    }),
    validateAnnoucement: builder.mutation({
      query: (body) => ({
        url: `/announcement/validate`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["announcement"],
      transformResponse: (response) => response.message,
      transformErrorResponse: (error) => error.data.message,
    }),
  }),
});

export const {
  useCreateAnnoucementMutation,
  useGetAnnoucementsQuery,
  useDeleteAnnoucementsMutation,
  useGetAnnoucementQuery,
  useValidateAnnoucementMutation,
  useEditAnnoucementMutation,
} = annoucementSlice;
