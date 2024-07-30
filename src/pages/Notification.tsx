import Title from "@/components/share/Title";
import { useGetNotificationsQuery, useReadNotificationMutation } from "@/redux/apiSlices/notificationApi";
import { useEffect } from "react";

const Notification = () => {
  const {data: notification, refetch} = useGetNotificationsQuery(undefined);
  const [ readNotification ] = useReadNotificationMutation()

  useEffect(()=>{
    async function getApi(){
      await readNotification(undefined).then((response)=>{
        if(response.data?.statusCode === 200){
          refetch()
        }
      })
    }
    getApi()
  }, [readNotification, refetch])
  
  return (
    <div>
      
      <Title className="text-white p-4">Notifications</Title>
      {notification?.data?.data.map((notification:any, index: number) => (
        <div key={index} className="text-white bg-base p-4 m-2 rounded">
          <p className="text-md">{notification?.message}</p>
          <p className="text-gray-500 text-sm">{notification?.date}</p>
        </div>
      ))}
    </div>
  );
};

export default Notification;
