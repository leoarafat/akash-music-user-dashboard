import { api } from "../api/apiSlice";

const adminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllProgram: builder.query({
      query: () => "/training/all",
      providesTags: ["program"],
    }),
  }),
});

export const { useGetAllProgramQuery } = adminApi;
