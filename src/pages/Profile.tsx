import { Edit, Upload } from "lucide-react";
import { useEffect, useState } from "react";

import { imageUrl } from "@/redux/api/apiSlice";
import {
  useGetProfileQuery,
  useUpdatedProfileMutation,
} from "@/redux/apiSlices/authApi";
import { Button, Col, Form, Input, Row } from "antd";
import Swal from "sweetalert2";

const Profile = () => {
  const [openEdit, setOpenEdit] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [image, setImage] = useState();
  const { data, isLoading } = useGetProfileQuery(undefined);
  const [updatedProfile, { isSuccess, isError, error }] =
    useUpdatedProfileMutation();

  const initialFormValues = {
    name: data?.data.name,
    email: data?.data?.email,
    phone_number: data?.data?.phone_number,
    date_of_birth: data?.data?.date_of_birth,
    gender: data?.data?.gender,
    role: data?.data?.role,
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    const url = URL.createObjectURL(file);
    setImgUrl(url);
  };
  const src = imgUrl ? imgUrl :    data?.data?.profile_image?.startsWith("https") ? data?.data?.profile_image  : `${imageUrl}/${data?.data?.profile_image}`;
  // <img src={  data?.data?.profile_image?.startsWith("https") ? data?.data?.profile_image  : `${imageUrl}/${data?.data?.profile_image}`} />

  useEffect(() => {
    if (isSuccess) {
      if (data) {
        Swal.fire({
          title: "Profile",
          text: "Profile updated successfully",
          icon: "success",
          timer: 1500,
        });
        setOpenEdit(false);
      }
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (isError) {
      Swal.fire({
        title: "Failed to update profile",
        text: error?.data?.message,
        icon: "error",
      });
    }
  }, [error?.data?.message, isError]);

  const onFinish = async (values: any) => {
    const formData = new FormData();
    if (image) {
      formData.append("profile_image", image);
    }
    Object.entries(values).forEach(([field, value]) =>
      formData.append(field, value as any)
    );

    const value = {
      id: data?.data?._id,
      data: formData,
    };
    await updatedProfile(value);
  };

  return (
    <div className="w-2/4 mx-auto">
      <div className="text-center bg-base p-4 rounded mb-5">
        {!openEdit && (
          <div className="flex justify-end">
            <button className="text-blue" onClick={() => setOpenEdit(true)}>
              <Edit size={20} />
            </button>
          </div>
        )}
        <div>
          {openEdit ? (
            <div>
              <input
                type="file"
                className=" hidden"
                id="image"
                onChange={handleImage}
              />
              <label
                htmlFor="image"
                className="border flex justify-center items-center w-28 h-28 rounded-full  cursor-pointer mx-auto relative"
              >
                <img src={src} className="w-full h-full  rounded-full" alt="" />
                <div className="absolute">
                  <Upload size={30} color="#fff" />
                </div>
              </label>
            </div>
          ) : (
            <img
              src={src}
              alt=""
              className="w-28 h-28 rounded-full inline-block"
            />
          )}
        </div>
        <h2 className="text-2xl mt-2 text-white">{data?.data?.name}</h2>
      </div>

      <div>
        {!openEdit ? (
          <Form layout="vertical" initialValues={initialFormValues}>
            <Row
              gutter={{
                xs: 8,

                lg: 15,
              }}
            >
              <Col span={12}>
                <Form.Item
                  label={<div className="text-white">Name</div>}
                  name="name"
                >
                  <Input
                    size="large"
                    className="bg-transparent border text-white border-[#3a3a3a] placeholder:text-gray-400 py-3 hover:bg-transparent focus:bg-transparent"
                    readOnly
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={<div className="text-white">Email</div>}
                  name="email"
                >
                  <Input
                    size="large"
                    className="bg-transparent border text-white border-[#3a3a3a] placeholder:text-gray-400 py-3 hover:bg-transparent focus:bg-transparent"
                    readOnly
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={<div className="text-white">Phone number</div>}
                  name="phone_number"
                >
                  <Input
                    size="large"
                    className="bg-transparent border text-white border-[#3a3a3a] placeholder:text-gray-400 py-3 hover:bg-transparent focus:bg-transparent"
                    readOnly
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={<div className="text-white">Date of Birth</div>}
                  name="date_of_birth"
                >
                  <Input
                    size="large"
                    className="bg-transparent border text-white border-[#3a3a3a] placeholder:text-gray-400 py-3 hover:bg-transparent focus:bg-transparent"
                    readOnly
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={<div className="text-white">Gender</div>}
                  name="gender"
                >
                  <Input
                    size="large"
                    className="bg-transparent border text-white border-[#3a3a3a] placeholder:text-gray-400 py-3 hover:bg-transparent focus:bg-transparent"
                    readOnly
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={<div className="text-white">User Type</div>}
                  name="role"
                >
                  <Input
                    size="large"
                    className="bg-transparent border text-white border-[#3a3a3a] placeholder:text-gray-400 py-3 hover:bg-transparent focus:bg-transparent"
                    readOnly
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        ) : (
          //edit section
          <Form
            layout="vertical"
            initialValues={initialFormValues}
            onFinish={onFinish}
          >
            <Row
              gutter={{
                xs: 8,
                lg: 15,
              }}
            >
              <Col span={12}>
                <Form.Item
                  label={<div className="text-white">Name</div>}
                  name="name"
                >
                  <Input
                    size="large"
                    className="bg-transparent border text-white border-[#3a3a3a] placeholder:text-gray-400 py-3 hover:bg-transparent focus:bg-transparent"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={<div className="text-white">Email (Can't change)</div>}
                  name="email"
                >
                  <Input
                    size="large"
                    className="bg-transparent border text-white border-[#3a3a3a] placeholder:text-gray-400 py-3 hover:bg-transparent focus:bg-transparent"
                    readOnly
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={<div className="text-white">Phone Number</div>}
                  name="phone_number"
                >
                  <Input
                    size="large"
                    className="bg-transparent border text-white border-[#3a3a3a] placeholder:text-gray-400 py-3 hover:bg-transparent focus:bg-transparent"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={<div className="text-white">Date of birth</div>}
                  name="date_of_birth"
                >
                  <Input
                    size="large"
                    className="bg-transparent border text-white border-[#3a3a3a] placeholder:text-gray-400 py-3 hover:bg-transparent focus:bg-transparent"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label={
                    <div className="text-white">Gender (Can't change)</div>
                  }
                  name="gender"
                >
                  <Input
                    size="large"
                    className="bg-transparent border text-white border-[#3a3a3a] placeholder:text-gray-400 py-3 hover:bg-transparent focus:bg-transparent"
                    readOnly
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={
                    <div className="text-white">User Type (Can't change)</div>
                  }
                  name="role"
                >
                  <Input
                    size="large"
                    className="bg-transparent border text-white border-[#3a3a3a] placeholder:text-gray-400 py-3 hover:bg-transparent focus:bg-transparent"
                    readOnly
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button
                type="primary"
                className="bg-secondary h-10 text-lg"
                htmlType="submit"
              >
                Save changes
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
  );
};

export default Profile;
