import { api } from "../api/apiSlice";

const scheduleApi= api.injectEndpoints({
    endpoints : (builder) => ({
        getSchedule : builder.query({
            query : (value)=> {
                const {page, keyword} = value;
                const params = new URLSearchParams();
                if(keyword) params.append("searchTerm", keyword);
                if(page) params.append("page", page);
                return{
                    url:`/schedule/all?${params.toString()}`,
                    method: "GET"
                }
            }
        }),
        updateSchedule : builder.mutation({
            query: ({id, value}) => {
                return{
                    url: `/schedule/update/${id}`,
                    method: "PATCH",
                    body: value,
                }
            }
        }),
        deleteSchedule : builder.mutation({
            query: (id) => ({
                method: "DELETE",
                url: `/schedule/delete/${id}`,
            })
        }),
    })
})
export const { useGetScheduleQuery, useDeleteScheduleMutation, useUpdateScheduleMutation } = scheduleApi;