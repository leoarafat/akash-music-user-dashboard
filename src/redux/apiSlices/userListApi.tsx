import { api } from "../api/apiSlice";

const userListApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: (value) => {
                const {plan, keyword, page} = value;
                const limit = 8;
                const params = new URLSearchParams();
                if (keyword) params.append('name', keyword);
                if (plan) params.append('plan_type', plan);
                if (page) params.append('page', page);
                if (limit) params.append('limit', limit);
                return {
                    url : `/auth/admin/users?${params.toString()}`,
                    method: "GET"
                };
            }
        }),
        blockUser: builder.mutation({
            query: (id) => ({
                url: `/auth/admin/user-block/${id}`,
                method: "PATCH",
                body: {}
            })
        }),
        sendSchedule: builder.mutation({
            query: (scheduleData) => ({
                url: `/schedule/add`,
                method: "POST",
                body: scheduleData,
            }),
        }),
    })
})
export const { useGetAllUsersQuery, useBlockUserMutation, useSendScheduleMutation } = userListApi