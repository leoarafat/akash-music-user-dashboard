import { Form, Input, Modal, Button } from "antd";
import { Image } from "lucide-react";
import { useEffect, useState } from "react";

import { useForm } from "antd/es/form/Form";
import { imageUrl } from "@/redux/api/apiSlice";
import { useCreateProgramMutation, useUpdateProgramMutation } from "@/redux/apiSlices/programApi";
import Swal from "sweetalert2";

interface OfferModelProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  value: any;
  setValue: ( any : null )=> void;
  refetch: ()=> void;
}

const TrainingProgramModel: React.FC<OfferModelProps> = ({ open, setValue, refetch, value, setOpen }) => {
  const [ createProgram, { isLoading: createLoading } ] = useCreateProgramMutation();
  const [ updateProgram, { isLoading } ] = useUpdateProgramMutation();

  const [image, setImage] = useState(null)
  const [imageURL, setImageUrl] = useState("");


  const handleCancel = () => {
    setOpen(false);
    form.resetFields()
    setImageUrl("")
    setValue(null)
  };

  const onFinish = async (values: any) => {
    const formData = new FormData();
    if(image){
      formData.append("image", image)
    }
    formData.append("title", values?.title)

    if(value?._id){
      await updateProgram({id:value?._id, value: formData}).then((response)=>{
        if(response?.data?.statusCode === 200){
          Swal.fire({
            title: "Updated!",
            text: "Program has been Updated",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          }).then(()=>{
            refetch()
            handleCancel()
          })
        }
      })
    }else{
      await createProgram(formData).then((response)=>{
        if(response?.data?.statusCode === 200){
          Swal.fire({
            title: "Created",
            text: "Program has been Created",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          }).then(()=>{
            refetch()
            handleCancel()
          })
        }
      })
    }

    
  };

  const handleImage = (e: any) => {
    const file = e.target.files?.[0];
    setImage(file)
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  const [form] = useForm();

  useEffect(()=>{
    if(value){
      form.setFieldsValue(value)
      setImageUrl(`${imageUrl}${value?.image}`)
    }
  }, [form, value])

  return (
    <div>
      <Modal  centered title={<p className="text-xl text-white mt-1">{value?._id ? "Edit Program" : "Create An Program"}</p>} open={open} onCancel={handleCancel} footer={false}>
        <Form form={form} onFinish={onFinish} layout="vertical" className="mt-6">
          <Form.Item
            name={"title"}
            label={<div className="text-white">Training Program Name</div>}
          >
            <Input
              placeholder="Enter package name"
              className="h-12 bg-transparent hover:bg-transparent focus:bg-transparent placeholder:text-gray-500 text-white"
            />
          </Form.Item>
        
        <div>
          <h2 className="text-md mb-2 text-white">Training Program Thumbnail</h2>
          <input
            type="file"
            style={{display: "none"}}
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
                className="w-full h-full object-contain rounded"
                alt=""
              />
            ) : (
              <Image size={30} color="white" />
            )}
          </label>
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
                { isLoading || createLoading ? "Updating..." : "Update" }
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TrainingProgramModel;
