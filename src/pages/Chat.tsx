/* eslint-disable @typescript-eslint/no-explicit-any */
import { Camera, SendHorizontal } from "lucide-react";
import { useGetConversationsQuery, useGetMessagesQuery, useSendMessageMutation } from "@/redux/apiSlices/messageApi";
import { imageUrl } from "@/redux/api/apiSlice";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSocket } from "@/provider/socket";
import moment from "moment";



const Chat = () => {
  const { socket } = useSocket()
  const { data : conversation }  = useGetConversationsQuery(undefined);
  const [messageList, setMessageList] = useState<any[]>([]);
  const [partnerId, setPartnerId] = useState();
  const [keyword, setKeyword] = useState("");
  const [image, setImage] = useState<File | null>(null)
  const [imageURL, setImageURL] = useState<string>("")
  const { data: messages, isLoading, refetch }  = useGetMessagesQuery(partnerId);
  const [sendMessage] = useSendMessageMutation();
  const scrollRef = useRef();

  useEffect(() => {
    if (partnerId) {
      refetch();
    }
  }, [partnerId, refetch]);

  const handleConnection = useCallback((data: any) => {
    setMessageList([...messageList , data]);
  }, [messageList]);

  useEffect(()=>{
    if(!isLoading && partnerId){
      setMessageList(messages?.data)
    }
  }, [messages, isLoading, partnerId]);

  useEffect(() => {
    let event: string;
    if(partnerId){
      event = `message::${partnerId}`;
      socket.on(event, handleConnection);
    }
    return () => {
      socket.off(event, handleConnection);
    };
    
  }, [partnerId, socket, handleConnection]);

  const handleChange = (e:any)=>{
    const file = e.target.files[0];
    setImage(file)
    const url = URL.createObjectURL(file);
    setImageURL(url)
  }

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
}, [messageList]);

  const handleSubmit=async()=>{
    const formData = new FormData();
    formData.append("message", keyword)
    if(partnerId){
      formData.append("conversationId", partnerId)
    }
    if(image){
        formData.append("image", image)
    }
    
    await sendMessage(formData).then((response :any)=>{
        if(response?.data?.statusCode === 200){
            setKeyword("")
            setImage(null)
            setImageURL("")
        }
    })
}

  return (
    <div className="h-[calc(100vh-134px)] overflow-hidden">
      <div className="grid grid-cols-12 gap-3 h-[calc(100vh-134px)] ">


        <div className="bg-primary col-span-3 rounded overflow-auto p-4">
          {conversation?.data?.map((user:any, index:number) => (
            <div
              key={index}
              className={`flex items-center gap-2 bg-base mb-1 p-2 rounded ${user?._id === partnerId ? "bg-blue" : null }  hover:bg-blue cursor-pointer duration-100`}
              onClick={()=>setPartnerId(user?._id)}
            >
              <img 
                style={{width: 54, height: 56, borderRadius: "100%"}} 
                src={ user?.participants?.profile_image?.startsWith("https") ?   user?.participants?.profile_image : `${imageUrl}/${user?.participants?.profile_image}`}
              />

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg text-white">{user?.participants?.name}</h2>
                </div>
                <p className="text-gray-400">Welcome to durdanto</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-primary col-span-9 relative rounded">
          {
            partnerId ?
          
          <section className="h-[calc(100vh-134px)] flex flex-col">
            <div ref={scrollRef} className="flex-1 overflow-y-scroll  p-4 flex flex-col gap-2 text-white">
              {messageList?.map((message:any, index:number) => {
                return(
                  <>
                    {message?.messageType === "image" &&
                    <div
                      key={index}
                      className={`flex ${
                        message.sender === "user" ? "justify-start" : "justify-end"
                      }`}
                    >
                      <div
                        className={`${
                          message.sender === "user"
                            ? "bg-secondary rounded-xl rounded-bl-none text-left"
                            : "bg-blue rounded-xl rounded-br-none text-right"
                        } p-4`}
                      >
                        <img style={{width: 201, height: 155, borderRadius: 8}} src={`${imageUrl}${message?.image}`} alt="" />
                        <p className='text-[#8B8B8B] poppins-regular mt-3 text-sm leading-4 text-right'>{moment(message?.createdAt).format("LT")} </p>
                      </div>
                    </div>}

                    {message?.messageType === "both" &&
                    <div
                      key={index}
                      className={`flex ${
                        message.sender === "user" ? "justify-start" : "justify-end"
                      }`}
                    >
                      <div
                        className={`${
                          message.sender === "user"
                            ? "bg-secondary rounded-xl rounded-bl-none text-left"
                            : "bg-blue rounded-xl rounded-br-none text-right"
                        } p-4`}
                      >
                        <img style={{width: 201, height: 155, borderRadius: 8}} src={`${imageUrl}${message?.image}`} alt="" />
                        <p className='text-[#8B8B8B] poppins-regular mt-3 text-sm leading-4 text-right'>{message?.message} </p>
                        <p className='text-[#8B8B8B] poppins-regular mt-3 text-sm leading-4 text-right'>{moment(message?.createdAt).format("LT")} </p>
                      </div>
                    </div>}

                    {message?.messageType === "text" &&
                    <div
                      key={index}
                      className={`flex ${
                        message.sender === "user" ? "justify-start" : "justify-end"
                      }`}
                    >
                      <div
                        className={`${
                          message.sender === "user"
                            ? "bg-secondary rounded-xl rounded-bl-none text-left"
                            : "bg-blue rounded-xl rounded-br-none text-right"
                        } p-4`}
                      >
                        <p className='text-[#8B8B8B] poppins-regular mt-3 text-sm leading-4 text-right'>{message?.message} </p>
                        <p className='text-[#8B8B8B] poppins-regular mt-3 text-sm leading-4 text-right'>{moment(message?.createdAt).format("LT")} </p>
                      </div>
                    </div>}


                  </>
                )
              })}
            </div>

            <div className="flex items-center gap-2 bg-white p-1 rounded-md relative">
              <div style={{display: imageURL ? "block" : "none"}} className='absolute left-3 bottom-[70px]  w-full'>
                <img style={{width: 200 ,height: 200, }} src={imageURL} alt="" />
              </div>
              <input
                type="text"
                value={keyword}
                className="w-full border-0 outline-0 rounded-md h-12 p-2"
                onChange={(e)=> setKeyword(e.target.value)}
                placeholder="Enter message"
              />
              <input type="file" onChange={handleChange} className="hidden" id="image" />
              <label
                htmlFor="image"
                className="bg-blue text-white p-2 rounded-md block cursor-pointer"
              >
                <Camera />
              </label>
              <button disabled={!image && !keyword} onClick={handleSubmit} className="bg-secondary text-white px-5 py-2 rounded-md">
                <SendHorizontal />
              </button>
            </div>
          </section>
          :
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-500 text-2xl leading-7">
          Start Message
        </div>
        
          }
        </div>
      </div>
    </div>
  );
};

export default Chat;
