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
      transformResponse: (response) => response,
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
    viewAd: builder.query({
      query: (status) => ({
        url: `/ad/${status}`,
        method: "GET",
      }),
      providesTags: ["ads"],
      transformResponse: (response) => response.body,
      transformErrorResponse: (error) => error.data,
    }),
    validateAd: builder.mutation({
      query: (body) => ({
        url: `/ad/validate`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["ads"],
      transformResponse: (response) => response.message,
      transformErrorResponse: (error) => error.data.message,
    }),
  }),
});

export const {
  useCreateAdsMutation,
  useGetAdsQuery,
  useViewAdQuery,
  useValidateAdMutation,
} = adsSlice;
