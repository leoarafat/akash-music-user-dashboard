/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import SliderModel from "@/components/Slider/SliderModel";
import Button from "@/components/share/Button";
import Title from "@/components/share/Title";
import { imageUrl } from "@/redux/api/apiSlice";
import {
  useDeleteSliderMutation,
  useGetSliderQuery,
} from "@/redux/apiSlices/settingApi";
import { Table } from "antd";
import { Edit, Plus, Trash2 } from "lucide-react";
import {useState } from "react";
import Swal from "sweetalert2";

const Slider = () => {
  const { data, isLoading, refetch } = useGetSliderQuery(undefined);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null)
  const [deleteSlider] =useDeleteSliderMutation();

  const showModal = (values:any) => {
    setOpen(true);
    setValue(values)
  };
  

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (_: any, data: any) => (
        <img
          src={`${imageUrl}${data.image}`}
          alt=""
          style={{ width: "200px" }}
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: <div className="text-right">Action</div>,
      dataIndex: "action",
      key: "action",
      render: (_: any, data: any) => (
        <div className="flex items-center gap-2 justify-end">
          <button onClick={()=>showModal({data})} className="text-gray-400">
            <Edit />
          </button>
          <button
            className="text-red-500"
            onClick={() => handleDelete(data._id)}
          >
            <Trash2 />
          </button>
        </div>
      ),
    },
  ];

  const handleDelete=async(id: string)=>{
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
        await deleteSlider(id).then((response)=>{
          if(response?.data?.statusCode === 200){
            Swal.fire({
              title: "Deleted!",
              text: "Slider has been deleted.",
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

  return (
    <div>
      <div className="flex justify-between px-4 items-center mb-10 mt-4">
        <Title className="text-white">Sliders</Title>
        <Button onClick={()=>showModal({})} icon={<Plus size={20} />}>
          Add Cover
        </Button>
      </div>
      <Table
        dataSource={data?.data}
        columns={columns}
        pagination={false}
        rowHoverable={false}
      />
      <SliderModel refetch={refetch} value={value} open={open} setOpen={setOpen} />
    </div>
  );
};

export default Slider;
