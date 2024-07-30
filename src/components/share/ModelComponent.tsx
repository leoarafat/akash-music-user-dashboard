/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Form, Modal} from "antd";
import {  useState } from "react";
import { imageUrl } from "@/redux/api/apiSlice";

interface IButtonProps{
  openModel: boolean;
  setOpenModel: (value: boolean) => void;
  data: any;
  type: string;
  title?: string;
  setUserData?: any;
}

const ModelComponent = ({ openModel, setOpenModel, data, type, title, setUserData }:IButtonProps ) => {


  const [form] = Form.useForm();
  form.setFieldsValue(undefined)
  const [imageURL, setImageUrl] = useState("");
  const { image, action, ...userData } = data;


  const handleImage = (e: any) => {
    const file = e.target.files?.[0];
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };


  const hideModal = () => {
    setOpenModel(false);
    form.resetFields()
    setUserData(null)
  };

  

  
  
  return (
    <div>
      <Modal
        title={<p className="text-[#F4F5F7] font-semibold text-xl mt-[4px]">{title}</p>}
        centered
        open={openModel}
        onOk={hideModal}
        onCancel={hideModal}
        footer={false}
        // headerStyle={{}}
      >
        {type === "user" && (
          <div className="mt-4">
            <div className="bg-blue w-full h-44 rounded flex justify-center items-center text-center mb-5 flex-col">
              {image && image?.includes('http') ? <img className="w-24 h-24 rounded-full" src={image} /> : <img className="w-24 h-24 rounded-full" src={`${imageUrl}${image}`} />}
              <p className="mt-2 text-xl text-center">{userData?.name}</p>
            </div>
            {Object.entries(userData).map(([field, value]) => {
              if (field == 'key') {
                return
              }
              return (
                <div key={field} className="mb-3">
                  <h2 className="text-xl font-normal text-blue capitalize">
                    {field}
                  </h2>
                  {/* @ts-ignore */}
                  <p>{value}</p>
                </div>
              )
            })}
          </div>
        )}

        
      </Modal>
    </div>
  );
};

export default ModelComponent;
