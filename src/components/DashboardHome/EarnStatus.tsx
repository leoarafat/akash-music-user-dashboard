import { useGetEarnStatusQuery } from "@/redux/apiSlices/dashboardApi";
import { DollarSignIcon, User } from "lucide-react";

const EarnStatus = () => {
  const { data }: any = useGetEarnStatusQuery(undefined)
  const earnStatus = [
    {
      title: "Total Users",
      count: data?.data?.totalUser || 0,
      icon: <User size={30} />,
      color: "#D2F6FF",
      bgColor: "#1E1E1E",
    },
    {
      title: "Total Earning",
      count: data?.data?.totalEarnings || 0,
      icon: <DollarSignIcon size={30} />,
      color: "#D2F6FF",
      bgColor: "#1E1E1E",
    },
  ];
  return (
    <div className="grid grid-cols-2 gap-2">
      {earnStatus.map((data, index) => (
        <div
          key={index}
          className="flex items-center gap-5  p-5 rounded bg-base"
        >
          <div
            className="w-16 h-16 flex items-center justify-center rounded-full"
            style={{ background: data.bgColor, color: data.color }}
          >
            {data.icon}
          </div>
          <div>
            <h3 className="text-lg font-normal text-gray-300">{data.title}</h3>
            <h2 className="text-3xl font-semibold text-yellow">{data.count}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EarnStatus;
