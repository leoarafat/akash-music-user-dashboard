import { Checkbox, Form, Input, Modal, Button } from "antd";
import { FaCircleCheck } from "react-icons/fa6";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { useUpdateSubscriptionMutation } from "@/redux/apiSlices/subscriptionApi";
import Swal from "sweetalert2";

interface OfferModelProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: any;
  refetch:()=> void;
}

const PackageModel: React.FC<OfferModelProps> = ({ open, data, setOpen, refetch }) => {
  const [ updateSubscription, {isLoading} ] = useUpdateSubscriptionMutation()
  const [form] = useForm();
  const handleCancel = () => {
    setOpen(false);
  };
  
  const onFinish = async (values: any) => {
    await updateSubscription({ id: data?._id, value:values}).then((response)=>{
      if(response.data.statusCode === 200){
        Swal.fire({
          title: "Updated!",
          text: "Subscription has been Updated.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        }).then(()=>{
          refetch()
          handleCancel()
        })
      }
    })
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        packageName: data.packageName,
        packagePrice: data.packagePrice,
        packageDuration: data.packageDuration,
        trainingVideo: {
          title: data.trainingVideo.title,
          status :data.trainingVideo.status
        },
        communityGroup:{
          title: data.communityGroup.title,
          status :data.communityGroup.status
        },
        videoLesson: {
          title: data.videoLesson.title,
          status :data.videoLesson.status
        },
        chat: {
          title: data.chat.title,
          status :data.chat.status
        },
        program: {
          title: data.program.title,
          status :data.program.status
        },
      });
    }
  }, [form, data]);

  return (
    <div>
      <Modal
        centered
        open={open}
        onCancel={handleCancel}
        footer={false}
        width={800}
        title={<p className="text-xl text-white mt-1">Edit Package</p>}
      >
        <Form form={form} onFinish={onFinish} layout="vertical" className="mt-6 ">
          <div className="grid grid-cols-2 gap-6">
            <div className="">
              <Form.Item name={"packageName"} label={<div className="text-white">Package Name</div>}>
                <Input
                  placeholder="Enter package name"
                  className="h-12 bg-transparent hover:bg-transparent focus:bg-transparent placeholder:text-gray-500 text-white"
                />
              </Form.Item>
              <Form.Item getValueFromEvent={(e)=> Number(e.target.value)} name={"packagePrice"} label={<div className="text-white">Package Price</div>}>
                <Input
                  type="number"
                  placeholder="Enter package price"
                  className="h-12 bg-transparent hover:bg-transparent focus:bg-transparent placeholder:text-gray-500 text-white"
                />
              </Form.Item>
              <Form.Item name={"packageDuration"} label={<div className="text-white">Package Duration</div>}>
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
                { isLoading ? "Updating..." : "Update" }
            </Button>
          </Form.Item>
        </Form>

      </Modal>
    </div>
  );
};

export default PackageModel;