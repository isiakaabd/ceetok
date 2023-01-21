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
      transformErrorResponse: (error) => error.data.message,
    }),
    getAnnoucements: builder.query({
      query: (body) => ({
        url: `/announcement`,
        method: "GET",
        body,
      }),
      providesTags: ["announcement"],
      transformResponse: (response) => response.body.announcements,
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
  }),
});

export const {
  useCreateAnnoucementMutation,
  useGetAnnoucementsQuery,
  useDeleteAnnoucementsMutation,
} = annoucementSlice;
