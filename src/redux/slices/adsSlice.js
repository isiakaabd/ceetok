import { api } from ".";

export const adsSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createAds: builder.mutation({
      query: (body) => ({
        url: `/ad`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["ads"],
      //   transformResponse: (response) => response.body.views,
      transformErrorResponse: (error) => error.data,
    }),
    getAds: builder.query({
      query: (status) => ({
        url: `/ad ${status ? `?approved=${status}` : ""}`,
        method: "GET",
      }),
      providesTags: ["ads"],
      transformResponse: (response) => response.body,
      transformErrorResponse: (error) => error.data,
    }),
  }),
});

export const { useCreateAdsMutation, useGetAdsQuery } = adsSlice;
