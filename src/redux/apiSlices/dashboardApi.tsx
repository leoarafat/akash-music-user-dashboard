import { api } from "../api/apiSlice";

const dashboardApi= api.injectEndpoints({
    endpoints : (builder) => ({
        getEarnStatus : builder.query({
            query : ()=> `/overview/total-users-earning`,
            providesTags: ["earn"],
        }),
        getOverview : builder.query({
            query : ()=> `/overview/overviews`,
            providesTags: ["overview"],
        }),
        getPurchasedPackage : builder.query({
            query :(filter)=>{
                const params = new URLSearchParams();
                if(filter) params.append("plan_type", filter)
                return{
                    url : `/overview/purchased-package-list?${params?.toString()}`
                }
            } 
        })
    })
})
export const {useGetEarnStatusQuery,useGetOverviewQuery,useGetPurchasedPackageQuery} = dashboardApi