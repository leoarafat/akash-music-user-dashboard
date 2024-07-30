import { api } from "../api/apiSlice";

const messageApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: () => "/message/get-conversation",
      providesTags: ["message"],
    }),
    getMessages: builder.query({
      query: (id) => `/message/get-message/${id}`,
      providesTags: ["message"],
    }),
    
    sendMessage: builder.mutation({
      query: (data) => ({
        url: "/message/send-message",
        method: "POST",
        body: data,
      })
    })

  })
});

export const {
  useGetConversationsQuery,
  useSendMessageMutation,
  useGetMessagesQuery,
} = messageApi;
