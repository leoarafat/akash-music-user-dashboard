import { api } from "../api/apiSlice";

const adminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllPlan: builder.query({
      query: () => "/subscription-plan/all",
      providesTags: ["plan"],
    }),
    UpdatePlan: builder.mutation({
      query: (id) => ({
        url: `auth/plan/delete/${id}`,
        method: "DELETE",
        data: {}
      })
    }),
  }),
});

export const { useGetAllPlanQuery } = adminApi;
