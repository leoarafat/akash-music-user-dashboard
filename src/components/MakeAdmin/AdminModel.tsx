import { useCreateAdminMutation } from "@/redux/apiSlices/adminApi";
import { Form, Input, Modal } from "antd";
import { useEffect } from "react";
import Swal from "sweetalert2";
import Button from "../share/Button";
import passwordValidator from "@/util/passwordValidator";

interface OfferModelProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminModel: React.FC<OfferModelProps> = ({ open, setOpen }) => {
  const [form]  = Form.useForm();
  const [createAdmin, { isSuccess, isError, error, data }] =
    useCreateAdminMutation();

  const handleCancel = () => {
    setOpen(false);
    form.resetFields()
  };

  form.setFieldsValue(undefined)

  useEffect(() => {
    if (isSuccess) {
      if (data) {
        Swal.fire({
          title: "Admin Profile",
          text: "Admin profile created successfully",
          icon: "success",
          timer: 1500,
        });
        setOpen(false);
      }
    }
  }, [data, isSuccess, setOpen]);

  useEffect(() => {
    if (isError) {
      Swal.fire({
        title: "Failed to create admin",
        text: error?.data?.message,
        icon: "error",
      });
    }
  }, [error?.data?.message, isError]);

  const onFinish = async (valeus: any) => {
    await createAdmin(valeus);
  };



  return (
    <div>
      <Modal  centered open={open} onCancel={handleCancel} footer={false}>
        <p className="pt-1 text-xl">Create An Admin</p>
        <Form form={form} onFinish={onFinish} layout="vertical" className="mt-6">
          <Form.Item
            name="name"
            label={<p className="text-white">Full Name</p>}
            rules={[
              { required: true, message: "Please enter admin Full Name" }
            ]}
          >
            <Input
              placeholder="Enter full name"
              className=" border text-white border-[#3a3a3a] placeholder:text-gray-400 py-3 "
              size="large"
              style={{
                background: "transparent",
                border: "1px solid #C3C4C6",
                outline: "none",
                boxShadow: "none",
            }}
            />
          </Form.Item>
          <Form.Item 
            name="email" 
            label={<p className="text-white">Email</p>}
            rules={[
              { required: true, message: "Please enter admin Email" }
            ]}
          >
            <Input
              placeholder="Enter admin email"
              style={{
                background: "transparent",
                border: "1px solid #C3C4C6",
                outline: "none",
                boxShadow: "none",
            }}
              className="border text-white border-[#3a3a3a] placeholder:text-gray-400 py-3 "
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label={<p className="text-white">Password</p>}
            rules={[
              { required: true, message: "Please enter admin password" },
              {
                validator: passwordValidator,
              },
            ]}
          >
            <Input.Password
              placeholder="Enter admin password"
              style={{
                background: "transparent",
                border: "1px solid #C3C4C6",
                outline: "none",
                boxShadow: "none",
            }}
              className=" border text-white border-[#3a3a3a] placeholder:text-gray-400 py-3"
              size="large"
              name="password"
            />
          </Form.Item>

          <Button className="px-10 mx-auto mt-5">Save</Button>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminModel;
