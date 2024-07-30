import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Title from "../share/Title";

interface OverViewData {
 data :{ month: string, count: number}[]
}
const SealOverviewChart = ({ data }: OverViewData) => {
  const chartData = data.map((item) => {
    return { name: item?.month?.split(' ')[0], amt: item?.count }
  })
  return (
    <div className="bg-base rounded p-4 text-gray-300">
      <Title className="text-white mb-5">User Overview</Title>
      <ResponsiveContainer width="100%" className="h-[300px]" height={300}>
        <AreaChart data={chartData} syncId="anyId">
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="amt" stroke="#00D6FF" fill="#00D6FF" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SealOverviewChart;
