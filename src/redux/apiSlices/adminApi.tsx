import { api } from "../api/apiSlice";

const adminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllAdmin: builder.query({
      query: () => "/auth/admin/admins",
      providesTags: ["admin"],
    }),
    createAdmin: builder.mutation({
      query: (data) => ({
        url: "/auth/admin/add-admin",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["admin"],
    }),
    deleteAdmin: builder.mutation({
      query: (id) => ({
        url: `auth/admin/delete/${id}`,
        method: "DELETE"
      })
    }),
  }),
});

export const { useGetAllAdminQuery, useCreateAdminMutation, useDeleteAdminMutation } = adminApi;
