import Title from "@/components/share/Title";
import { Select, Table } from "antd";
import { useState } from "react";
import { useGetPurchasedPackageQuery } from "@/redux/apiSlices/dashboardApi";
import moment from "moment";
import { MdKeyboardArrowDown } from "react-icons/md";
import { imageUrl } from "@/redux/api/apiSlice";

const PurchasedPackageList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState("")
  const { data: purchaseData }=useGetPurchasedPackageQuery(selectedPackage);


  const columns = [
    {
      title: "S.ID",
      dataIndex: "sId",
      key: "sId",
      render: (_:string, _record: any, index:number)=>(
        <p>{index + 1}</p>
      )
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      render: (_:string, record: any)=>(
        <div className="flex items-center gap-2">
            <img style={{ width: 40, height: 40}} src={  record?.user_id?.profile_image?.startsWith("https") ? record?.user_id?.profile_image  : `${imageUrl}${record?.user_id?.profile_image}`} alt="" />
            {record?.user_id?.name}
        </div>
      )
    },
    {
      title: "Package",
      dataIndex: "plan_type",
      key: "plan_type",
    },
    {
      title: "T.ID",
      dataIndex: "transaction_id",
      key: "transaction_id",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (_:string, data:any)=>(
        <p>{moment(data?.startDate).format("L")}</p>
      )
    },
    {
      title: "End Dime",
      dataIndex: "endDate",
      key: "endDate",
      render: (_:string, data:any)=>(
        <p>{moment(data?.endDate).format("L")}</p>
      )
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
  ];


  const handlePage = (page: any) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-base rounded">

      <div className="flex items-center justify-between px-4 pt-4 mb-6">
        <Title className="text-white mb-3">Purchased Package List</Title>
        <Select
          placeholder="Select Package"
          allowClear
          className="h-12 placeholder:text-black"
          style={{
            width: 250,
            background: "transparent", color: "white"
          }}
          onChange={(e)=>setSelectedPackage(e)}
          suffixIcon={<MdKeyboardArrowDown color="white" size={24} />}
        >
                        
          <Select.Option  value="">{"All"}</Select.Option>
          <Select.Option  value="Basic">{"Basic"}</Select.Option>
          <Select.Option  value="Standard">{"Standard"}</Select.Option>
          <Select.Option  value="Premium">{"Premium"}</Select.Option>
        </Select>
      </div>

      <Table
        dataSource={purchaseData?.data?.data}
        columns={columns}
        rowHoverable={false}
        bordered={false}
        pagination={{
          total: purchaseData?.data?.meta?.total,
          current: currentPage,
          onChange: handlePage,
        }}
      />
    </div>
  );
};

export default PurchasedPackageList;
