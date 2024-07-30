import Title from "@/components/share/Title";
import { useCreatePromoCodeMutation, useDeletePromoMutation, useGetPromoCodePackageQuery, useGetPromoCodesQuery, useUpdatePromoPackageMutation } from "@/redux/apiSlices/promoCodeApi";
import { Button, Checkbox, Form, Input, Modal, Table } from "antd";
import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import Swal from "sweetalert2";

const CreateForm = () => {
  const [form] = Form.useForm();
  const { data: promoCode, refetch:PromoPackage } = useGetPromoCodePackageQuery(undefined);
  const [ updatePromoCode, {isLoading} ] = useUpdatePromoPackageMutation();
  const [ createPromoCode, {isLoading: isPromoLoading } ] = useCreatePromoCodeMutation();
  const [ deletePromo ] = useDeletePromoMutation();
  const  {data: promoCodes, refetch } = useGetPromoCodesQuery(undefined);
  const [open, setOpen] = useState(false)

  const handleSubmit = async (values:any) => {
    await updatePromoCode({id: promoCode?.data?._id, updateValue : values }).then((response)=>{
      if(response?.data?.statusCode === 200){
        Swal.fire({
          title: "Updated!",
          text: "Promo Package has been Updated",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        }).then(()=>{
          PromoPackage()
        })
      }
    })
  };

  useEffect(()=>{
    if(promoCode){
      form.setFieldsValue(promoCode?.data)
    }
  }, [ form, promoCode ]);

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
        await deletePromo(id).then((response)=>{
          if(response?.data?.statusCode === 200){
            Swal.fire({
              title: "Deleted!",
              text: "Promo Code has been deleted.",
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
      title: "S.ID",
      dataIndex: "sId",
      key: "sId",
      render: (_:any, _data:any, index:number)=>(
        <p>{index + 1}</p>
      )
    },

    {
      title: "Promo Code",
      dataIndex: "code",
      key: "code"
    },
    {
      title: <div className="text-right">Action</div>,
      dataIndex: "action",
      key: "action",
      render: (_: any, data: any) => (
        <div className="flex items-center gap-2 justify-end">
          <button onClick={()=>handleDelete(data?._id)} className="text-red-500">
            <Trash2 />
          </button>
        </div>
      ),
    },
  ]

  const handleCreate=async(values:any)=>{
    await createPromoCode({code: values?.code}).then((response)=>{
      if(response?.data?.statusCode === 200){
        Swal.fire({
          title: "Created!",
          text: "Promo Code has been Created.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        }).then(()=>{
          refetch()
          setOpen(false)
        })
      }
    })
  }

  return (
    <div className="p-6">
      <Title className="mb-6 text-white">Assign Promo Details</Title>
      <Form form={form} onFinish={handleSubmit} layout="vertical" className="mt-6 ">
          <div className="grid grid-cols-2 gap-6">
            <div className="">
              <Form.Item name={"packageName"} label={<div className="text-white">Promo Code Name</div>}>
                <Input
                  placeholder="Enter package name"
                  className="h-12 bg-transparent hover:bg-transparent focus:bg-transparent placeholder:text-gray-500 text-white"
                />
              </Form.Item>
              
              <Form.Item name={"packageDuration"} label={<div className="text-white">Promo Code Duration</div>}>
                <Input
                  placeholder="Enter Package Duration"
                  className="h-12 bg-transparent hover:bg-transparent focus:bg-transparent placeholder:text-gray-500 text-white"
                />
              </Form.Item>
            </div>

            <div className="">
              <h1 className="mb-2 text-white">Others Details</h1>
              <div className="w-full border mb-6 border-[#E0E4EC] flex items-center justify-between rounded-lg pr-2 h-[48px]">
                  <Form.Item name={["trainingVideo", "title"]} style={{marginBottom: 0, width: "100%"}}>
                    <Input
                      style={{
                        width: "100%",
                        border: "none",
                        background: "transparent",
                        boxShadow: "none"
                      }}
                      prefix={<FaCircleCheck size={24} color="red"/>}
                      readOnly
                      placeholder="Enter Package Duration"
                      className="h-12  placeholder:text-gray-500 text-white"
                    />
                  </Form.Item>
                  <Form.Item name={["trainingVideo", "status"]} valuePropName="checked" style={{marginBottom: 0}}>
                    <Checkbox  />
                  </Form.Item>
              </div>

              <div className="border mb-6 border-[#E0E4EC] flex items-center justify-between rounded-lg pr-2 h-[48px]">
                  <Form.Item name={["communityGroup", "title"]} style={{marginBottom: 0, width: "100%"}}>
                    <Input
                      style={{
                        width: "100%",
                        border: "none",
                        background: "transparent",
                        boxShadow: "none"
                      }}
                      prefix={<FaCircleCheck size={24} color="red"/>}
                      readOnly
                      placeholder="Enter Package Duration"
                      className="h-12  placeholder:text-gray-500 text-white"
                    />
                  </Form.Item>
                  <Form.Item name={["communityGroup", "status"]} valuePropName="checked" style={{marginBottom: 0}}>
                    <Checkbox  />
                  </Form.Item>
              </div>
              
              <div className="border mb-6 border-[#E0E4EC] flex items-center justify-between rounded-lg pr-2 h-[48px]">
                  <Form.Item name={["videoLesson", "title"]} style={{marginBottom: 0, width: "100%"}} >
                    <Input
                      style={{
                        width: "100%",
                        border: "none",
                        background: "transparent",
                        boxShadow: "none"
                      }}
                      prefix={<FaCircleCheck size={24} color="red"/>}
                      readOnly
                      placeholder="Enter Package Duration"
                      className="h-12  placeholder:text-gray-500 text-white"
                    />
                  </Form.Item>
                  <Form.Item name={["videoLesson", "status"]} valuePropName="checked" style={{marginBottom: 0}}>
                    <Checkbox  />
                  </Form.Item>
              </div>
              
              
              <div className="border mb-6 border-[#E0E4EC] flex items-center justify-between rounded-lg pr-2 h-[48px]">
                  <Form.Item name={["chat", "title"]} style={{marginBottom: 0, width: "100%"}}>
                    <Input
                      style={{
                        border: "none",
                        background: "transparent",
                        boxShadow: "none"
                      }}
                      prefix={<FaCircleCheck size={24} color="red"/>}
                      readOnly
                      placeholder="Enter Package Duration"
                      className="h-12  placeholder:text-gray-500 text-white"
                    />
                  </Form.Item>
                  <Form.Item name={["chat", "status"]} valuePropName="checked" style={{marginBottom: 0}}>
                    <Checkbox  />
                  </Form.Item>
              </div>

              <div className="border mb-6 border-[#E0E4EC] flex items-center justify-between rounded-lg pr-2 h-[48px]">
                  <Form.Item name={["program", "title"]} style={{marginBottom: 0, width: "100%"}}>
                    <Input
                      style={{
                        border: "none",
                        background: "transparent",
                        boxShadow: "none"
                      }}
                      prefix={<FaCircleCheck size={24} color="red"/>}
                      readOnly
                      placeholder="Enter Package Duration"
                      className="h-12  placeholder:text-gray-500 text-white"
                    />
                  </Form.Item>
                  <Form.Item name={["program", "status"]} valuePropName="checked" style={{marginBottom: 0}}>
                    <Checkbox  />
                  </Form.Item>
              </div>
            </div>
          </div>

          <Form.Item style={{width: "100%", display:  "flex", alignItems: "center", justifyContent: "center"}}>
            <Button 
              style={{
                background: "#00A2C1", 
                color: "white",
                border: "none", 
                outline: "none",
                height: 44
              }} 
              htmlType="submit" 
              className="px-10 mx-auto mt-5">
                { isLoading ? "Loading" : "Update"}
            </Button>
          </Form.Item>
      </Form>

      <br />
      <div className="flex items-center justify-between mb-6">
        <Title className=" text-white">All Promo Codes</Title>
        <Button className="flex items-center h-[42px]"
          style={{
            background: "#B10E1B", 
            color: "white",
            border: "none",
            outline: "none",
            boxShadow: "none"
          }} 
          onClick={()=>setOpen(true)} 
          icon={<Plus size={20}/>}
        >
          Create Promo Code
        </Button>
      </div>
      <Table
        dataSource={promoCodes?.data}
        columns={columns}
        pagination={false}
        rowHoverable={false}
      />

      <Modal
        centered
        open={open}
        onCancel={()=>setOpen(false)}
        footer={false}
        title={<p className="text-xl text-white mt-1">{"Create A Promo Code"}</p>} 
      >
        <Form layout="vertical" onFinish={handleCreate} form={form}>
          <Form.Item 
                    className='col-span-6'
                    label={<p className='text-[#F4F5F7]'>Promo Code</p>}
                    rules={[
                        {
                            required: true,
                            message: "Please Type Promo Code"
                        }
                    ]}
                    name={"code"}
                    style={{marginBottom: 0}}
                >
                    <Input
                        style={{
                            background: "transparent",
                            border: "1px solid #C3C4C6",
                            outline: "none",
                            boxShadow: "none",
                        }}
                        placeholder="Enter Promo Code"
                        className="h-12 placeholder:text-gray-500 text-white"
                    />
          </Form.Item>
          <Form.Item className="col-span-12  flex items-center justify-center w-full">
                    <Button 
                        htmlType='submit'
                        style={{
                            width: 170,
                            background: "#00A2C1",
                            border: "none",
                            outline: "none",
                            boxShadow: "none",
                            height: 44,
                            color: "white",
                            marginTop: 24
                        }}
                    >
                        { isPromoLoading ? "Creating..." : "Create"} 
                    </Button>
                </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateForm;
