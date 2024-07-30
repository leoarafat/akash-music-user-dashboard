import { api } from "../api/apiSlice";

const faqApi = api.injectEndpoints({
    endpoints: (builder)=>({
        createFaq: builder.mutation({
            query: (createValue)=>{
                return{
                    url : "/manage/add-faq",
                    method: "POST",
                    body: createValue
                }
            }
        }),
        getFaqs: builder.query({
            query: ()=>{
                return{
                    url: `/manage/get-faq`,
                    method: "GET"
                }
            }
        }),
        updateFaq: builder.mutation({
            query: ({id, value})=>{
                return{
                    url: `/manage/edit-faq/${id}`,
                    method: "PATCH",
                    body: value,
                }
            }
        }),

        deleteFaq: builder.mutation({
            query: (id:string)=>{
                return{
                    url: `/manage/delete-faq/${id}`,
                    method: "DELETE"
                }
            }
        })
    })
});

export  const { useCreateFaqMutation, useGetFaqsQuery, useUpdateFaqMutation, useDeleteFaqMutation } = faqApi;