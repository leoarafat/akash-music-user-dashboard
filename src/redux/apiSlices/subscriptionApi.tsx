import { api } from "../api/apiSlice";

const subscriptionApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getSubscription: builder.query({
            query: () => {
                return {
                    url: "/subscription-plan",
                    method: "GET"
                }
            }
        }),
        updateSubscription: builder.mutation({
            query: ({id, value}) => {
                return {
                    url: `/subscription-plan/${id}`,
                    method: "PATCH",
                    body: value
                }
            },
        }),
    })
}) 

export  const { useGetSubscriptionQuery, useUpdateSubscriptionMutation } = subscriptionApi;