/* eslint-disable @typescript-eslint/no-explicit-any */
import PackageModel from "@/components/Package/PackageModel";
import Title from "@/components/share/Title";
import { useGetSubscriptionQuery } from "@/redux/apiSlices/subscriptionApi";
import { Spin, Table } from "antd";
import { Edit } from "lucide-react";
import { useState } from "react";

const Packages = () => {
  const [open, setOpen] = useState(false);
  const {data: subscription, isLoading, refetch} = useGetSubscriptionQuery(undefined);
  const [value, setValue] = useState(null)


  const showModal = (data:any) => {
    setOpen(true);
    setValue(data)
  };
  

  const columns = [
    {
      title: "S.NO",
      dataIndex: "sNo",
      key: "sNo",
      render: (_: any, _data: any, index: number) => (
        <p>{index + 1}</p>
      )
    },
    {
      title: "Package Name",
      dataIndex: "packageName",
      key: "packageName",
    },
    {
      title: "Package Price",
      dataIndex: "packagePrice",
      key: "packagePrice",
    },
    {
      title: "Package Duration",
      dataIndex: "packageDuration",
      key: "packageDuration",
      render: (_: any, data: any) => (
        <p>{data?.packageDuration} Month</p>
      )
    },
    {
      title: <div className="text-right">Action</div>,
      dataIndex: "action",
      key: "action",
      render: (_: any, record: any) => (
        <div className="flex items-center gap-2 justify-end">
          <button onClick={()=> showModal(record)} className="text-white">
            <Edit />
          </button>
        </div>
      ),
    },
  ];

  if(isLoading){
    <div className="w-full h-[30vh] flex items-center justify-center">
      <Spin/>
    </div>
  }

  return (
    <div className="">
      <Title className="text-white px-4 pt-4 mb-6">Packages</Title>

      <Table
        dataSource={subscription?.data}
        columns={columns}
        rowHoverable={false}
        pagination={false}
      />
      <PackageModel refetch={refetch} data={value} open={open} setOpen={setOpen} />
    </div>
  );
};

export default Packages;
