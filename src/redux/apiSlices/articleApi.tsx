import { api } from "../api/apiSlice";

const articleApi = api.injectEndpoints({
    endpoints: (builder)=>({
        createArticle: builder.mutation({
            query: (createValue)=>{
                return{
                    url : "/program-article/add",
                    method: "POST",
                    body: createValue
                }
            }
        }),
        getArticle: builder.query({
            query: (search:string)=>{
                const params = new URLSearchParams();
                if(search) params.append("searchTerm", search)
                return{
                    url: `/program-article/all?${params.toString()}`,
                    method: "GET"
                }
            }
        }),
        updateArticle: builder.mutation({
            query: ({id, value})=>{
                return{
                    url: `/program-article/update/${id}`,
                    method: "PATCH",
                    body: value,
                }
            }
        }),

        deleteArticle: builder.mutation({
            query: (id:string)=>{
                return{
                    url: `/program-article/delete/${id}`,
                    method: "DELETE",
                    body: {}
                }
            }
        })
    })
});

export  const { useCreateArticleMutation, useGetArticleQuery, useUpdateArticleMutation, useDeleteArticleMutation } = articleApi;