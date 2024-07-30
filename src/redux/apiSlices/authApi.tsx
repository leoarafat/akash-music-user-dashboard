import { api } from "../api/apiSlice";

const authSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/auth/admin/login",
        body: data,
      }),
    }),
    getProfile: builder.query({
      query: () => "/auth/admin/profile",
      providesTags: ["profile"],
    }),
    updatedProfile: builder.mutation({
      query: (data) => ({
        url: `/auth/admin/edit-profile/${data.id}`,
        method: "PATCH",
        body: data.data,
      }),
      invalidatesTags: ["profile"],
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/auth/admin/forgot-password",
        body: data,
      })
    }),
    
    otpVerify: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/auth/admin/verify-otp",
        body: data,
      })
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/auth/admin/reset-password",
        body: data,
      })
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/auth/admin/change-password",
        body: data,
      })
    }),



  })
});

export const {
  useAdminLoginMutation,
  useGetProfileQuery,
  useUpdatedProfileMutation,
  useForgotPasswordMutation,
  useOtpVerifyMutation,
  useResetPasswordMutation,
  useChangePasswordMutation
} = authSlice;
