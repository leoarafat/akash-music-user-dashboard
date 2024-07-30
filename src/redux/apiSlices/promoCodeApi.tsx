import { api } from "../api/apiSlice";

const promoCodeApi = api.injectEndpoints({
    endpoints: (builder)=>({
        getPromoCodePackage: builder.query({
            query: ()=>{
                return{
                    url: "/promo-package/all",
                    method: "GET"
                }
            }
        }),
        updatePromoPackage: builder.mutation({
            query: ({id, updateValue}: {id: string, updateValue: any})=>{
                return {
                    url: `/promo-package/update/${id}`,
                    method: "PATCH",
                    body: updateValue
                }
            }
        }),
        getPromoCodes: builder.query({
            query: ()=>{
                return {
                    url: "/promo-package/all-codes",
                    method: "GET"
                }
            }
        }),
        deletePromo: builder.mutation({
            query: (id)=>{
                return{
                    url: `/promo-package/delete-code/${id}`,
                    method: "DELETE"
                }
            }
        }),
        createPromoCode: builder.mutation({
            query: (code)=>{
                return{
                    url: `/promo-package/add-promo-code`,
                    method: "POST",
                    body: code
                }
            }
        })

    })
});

export const { useGetPromoCodePackageQuery, useUpdatePromoPackageMutation, useGetPromoCodesQuery, useDeletePromoMutation, useCreatePromoCodeMutation } = promoCodeApi;