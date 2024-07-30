import { api } from "../api/apiSlice";

const notificationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => "/notification/get-all-notifications"
    }),
    readNotification: builder.mutation({
      query: () => ({
        url: "/notification/update-notification",
        method: "PATCH"
      })
    })

  })
});

export const {
  useGetNotificationsQuery,
  useReadNotificationMutation,
} = notificationApi;
