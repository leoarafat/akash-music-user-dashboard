import { Table } from "antd";
import { Link } from "react-router-dom";
import image from "../../assets/user.jpg";
import Title from "../share/Title";
import { useGetPurchasedPackageQuery } from "@/redux/apiSlices/dashboardApi";
import { imageUrl } from "@/redux/api/apiSlice";
import moment from "moment";


const PurchasedPackageList = () => {
  const { data: purchaseData}=useGetPurchasedPackageQuery(undefined)
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

  
  return (
    <div className="bg-base rounded p-4 mt-2 ">
      <div className="flex items-center justify-between">
        <Title className="text-white mb-3">Purchased Package List</Title>
        <Link
          to="/purchase-list"
          className="text-secondary text-lg hover:underline hover:text-secondary"
        >
          View all
        </Link>
      </div>
      <Table
        dataSource={purchaseData?.data?.data?.slice(0, 4)}
        columns={columns}
        pagination={false}
        rowHoverable={false}
        bordered={false}
      />
    </div>
  );
};

export default PurchasedPackageList;
