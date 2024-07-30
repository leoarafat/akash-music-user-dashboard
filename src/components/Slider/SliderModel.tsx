import { imageUrl } from "@/redux/api/apiSlice";
import { usePostSliderMutation, useUpdateSliderMutation } from "@/redux/apiSlices/settingApi";
import { Form, Input, Modal, Button } from "antd";
import { Image } from "lucide-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
// import Button from "../share/Button";

interface OfferModelProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  value: any;
  refetch: ()=> void;
}

const SliderModel: React.FC<OfferModelProps> = ({ open, setOpen, refetch, value }) => {
  const [imageURL, setImageUrl] = useState("");
  const [image, setImage] = useState("");
  const [postSlider, { isLoading}]=usePostSliderMutation();
  const [updateSlider, { isLoading: updateLoading}]= useUpdateSliderMutation();
  const [form] = Form.useForm()

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
    setImage("")
    setImageUrl("")
  };

  const handleImage = async (e: any) => {
    const file = e.target.files?.[0];
    setImage(file);
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };
  
  form.setFieldsValue(undefined)

  useEffect(()=>{
    if(value?.data?._id){
      form.setFieldsValue({title : value?.data?.title})
      setImageUrl(`${imageUrl}${value?.data?.image}`)
    }
  }, [value, form])
  

  const handleSave = async (values:any) => {
    const formData = new FormData();
    formData.append("title", values?.title);
    if (image){
      formData.append("image", image);
    }

    if(value?.data?._id){
      await updateSlider({id: value?.data?._id, value:formData}).then((response)=>{
        if(response?.data?.statusCode === 200){
          Swal.fire({
            title: "Updated!",
            text: "Slider has been Updated.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          }).then(()=>{
              setOpen(false);
              form.resetFields()
              setImageUrl("")
              setImage("")
              refetch()
          })
        }else{
          Swal.fire({
            title: "Oops",
            text: response?.error?.data?.message,
            icon: "error",
          });
        }
      });
    }else{
      await postSlider(formData).then((response)=>{
        if(response?.data?.statusCode === 200){
          Swal.fire({
            title: "Created!",
            text: "Slider has been Created.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          }).then(()=>{
              setOpen(false);
              form.resetFields()
              setImageUrl("")
              setImage("")
              refetch()
          })
        }else{
          Swal.fire({
            title: "Oops",
            text: response?.error?.data?.message,
            icon: "error",
          });
        }
      });
    }
  };


  
  return (
    <div>
      <Modal 
        centered
        title={<p className="text-xl text-white mt-1">Add Slider</p>} 
        open={open} 
        onCancel={handleCancel} 
        footer={false}
      >
        <Form form={form} onFinish={handleSave} layout="vertical" className="mt-10">
        <Form.Item
          label={<p className='text-[#F4F5F7]'>Slider Title</p>}
          rules={[
              {
                  required: true,
                  message: "Please Enter Slider Title"
              }
          ]}
          name={"title"}
        >
          <Input
            placeholder="Enter Title"
            className="h-12 bg-transparent hover:bg-transparent focus:bg-transparent placeholder:text-gray-500 text-white"
          />
        </Form.Item>
        
        <div>
          <h2 className="text-md mb-2 text-white">Slider Image</h2>
          <input
            type="file"
            style={{display: "none"}}
            className=" hidden"
            id="image"
            onChange={handleImage}
          />
          <label
            htmlFor="image"
            className="w-full border rounded flex justify-center items-center h-36 cursor-pointer"
          >
            {imageURL ? (
              <img
                src={imageURL}
                className="w-full h-full object-cover rounded"
                alt=""
              />
            ) : (
              <Image color="white" size={30} />
            )}
          </label>
        </div>
        
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
                        { isLoading  || updateLoading? "Uploading..." : "Save"} 
                    </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SliderModel;
