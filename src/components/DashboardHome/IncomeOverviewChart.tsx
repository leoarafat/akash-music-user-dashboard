import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import Title from "../share/Title";
interface OverViewData {
  data :{ month: string, count: number}[]
 }
const IncomeOverviewChart = ({data}:OverViewData) => {
  const chartData = data.map((item) => {
    return { name: item?.month?.split(' ')[0], amt: item?.count }
  })
  return (
    <div className="bg-base rounded p-4 ">
      <Title className="text-white mb-5">Income Overview</Title>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart height={300} data={chartData} barSize={20}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amt" fill="#DD1122" radius={[20, 20, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeOverviewChart;
