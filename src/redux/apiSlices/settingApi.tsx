import { api } from "../api/apiSlice";

const settingApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPrivacyPolicy: builder.query({
      query: () => "/manage/get-privacy-policy",
      providesTags: ["privacy"],
    }),
    postPrivacyPolicy: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/manage/add-privacy-policy",
        body: data,
      }),
      invalidatesTags: ["privacy"],
    }),
    getAbout: builder.query({
      query: () => "/manage/get-about-us",
      providesTags: ["about"],
    }),
    postAbout: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/manage/add-about-us",
        body: data,
      }),
      invalidatesTags: ["about"],
    }),
    getTermsAndConditions: builder.query({
      query: () => "/manage/get-terms-conditions",
      providesTags: ["terms"],
    }),
    postTermsAndConditions: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/manage/add-terms-conditions",
        body: data,
      }),
      invalidatesTags: ["terms"],
    }),
    getSlider: builder.query({
      query: () => "/manage/get-slider",
      providesTags: ["banner"],
    }),
    postSlider: builder.mutation({
      query: (data) => ({
        url: "/manage/add-slider",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["banner"],
    }),
    updateSlider: builder.mutation({
      query: ({id, value}) => {
        return{
          url: `/manage/edit-slider/${id}`,
          method: "PATCH",
          body: value,
        }
      }
    }),
    deleteSlider: builder.mutation({
      query: (id) => ({
        url: `/manage/delete-slider/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["banner"],
    }),
    getFaq: builder.query({
      query: () => `/manage/get-faq`,
      providesTags: ['faq']
    }),
    deleteFaq: builder.mutation({
      query: (id) => ({
        url: `/manage/delete-slider/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['faq']
    }),
    postFaq: builder.mutation({
      query: (data) => ({
        url: "/manage/add-faq",
        method: "POST",
        body: data,
      }),
      invalidatesTags:['faq']
    })
  }),
});

export const {
  useGetPrivacyPolicyQuery,
  usePostPrivacyPolicyMutation,
  useGetAboutQuery,
  usePostAboutMutation,
  useGetTermsAndConditionsQuery,
  usePostTermsAndConditionsMutation,
  useGetSliderQuery,
  usePostSliderMutation,
  useDeleteSliderMutation,
  useUpdateSliderMutation
} = settingApi;
