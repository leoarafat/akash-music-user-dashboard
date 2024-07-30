/* eslint-disable @typescript-eslint/no-explicit-any */
import AdminModel from "@/components/MakeAdmin/AdminModel";
import Button from "@/components/share/Button";
import Title from "@/components/share/Title";
import { useGetAllAdminQuery, useDeleteAdminMutation } from "@/redux/apiSlices/adminApi";
import { Table } from "antd";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import Swal from "sweetalert2";

const MakeAdmin = () => {
  const [deleteAdmin] = useDeleteAdminMutation()
  const [open, setOpen] = useState(false);
  const { data, refetch } = useGetAllAdminQuery(undefined);

  const showModal = () => {
    setOpen(true);
  };

  const handleDelete=async(id: string)=>{
    // await deleteAdmin(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#333434",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText : "No"
    }).then(async(result) => {
      if (result.isConfirmed) {
        await deleteAdmin(id).then((response)=>{
          if(response?.data?.statusCode === 200){
            Swal.fire({
              title: "Deleted!",
              text: "Admin has been deleted.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            }).then(()=>{
              refetch()
            })
          }
        })
        
      }
    });
  }

  const columns = [
    {
      title: "Full Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "User Type",
      dataIndex: "role",
      key: "role",
    },
    {
      title: <div className="text-right">Action</div>,
      dataIndex: "action",
      key: "action",
      render: (_: any, data: any) => (
        <div className="flex items-center gap-2 justify-end">
          <button onClick={()=>handleDelete(data._id)} className="text-red-500">
            <Trash2 />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-10 mt-4 px-4">
        <Title className="text-white">Make Admin</Title>
        <Button onClick={showModal} icon={<Plus size={18} />}>
          Add Admin
        </Button>
      </div>
      <Table
        dataSource={data?.data}
        columns={columns}
        pagination={false}
        rowHoverable={false}
      />
      <AdminModel open={open} setOpen={setOpen} />
    </div>
  );
};

export default MakeAdmin;
