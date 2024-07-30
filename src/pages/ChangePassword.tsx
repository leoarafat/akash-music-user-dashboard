import Title from "@/components/share/Title";
import { useChangePasswordMutation } from "@/redux/apiSlices/authApi";
import { Form, Input, Button } from "antd";
import { useState } from "react";
import Swal from "sweetalert2";

const ChangePassword = () => {
  const [changePassword, {isLoading}] = useChangePasswordMutation()
  const [newPassError, setNewPassError] = useState("");
  const [conPassError, setConPassError] = useState("");

  const validatePasswordChange = (values:any) => {
        let errors = {};
    
        if (values?.currentPassword === values.newPassword) {
            errors.newPassError = "The New password is similar to the old Password";
            setNewPassError(errors.newPassError);
        } else {
            setNewPassError("");
        }
    
        if (values?.newPassword !== values.confirmPassword) {
            errors.conPassError = "New Password and Confirm Password Don't Match";
            setConPassError(errors.conPassError);
        } else {
            setConPassError("");
        }
    
        return errors;
  };


  const handleChangePassword = async(values:any) => {
    const errors = validatePasswordChange(values);

    if (Object.keys(errors).length === 0) {
        await changePassword(values).then((response) => {
            if (response?.data?.statusCode === 200) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Password Updated Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: response?.error?.data?.message,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    }
};

  return (
    <div>
      <Title className="text-white">Changes password</Title>
      <div className="bg-base w-2/4 mx-auto p-4 rounded">
      <Form
                                layout='vertical'
                                // form={form}
                                onFinish={handleChangePassword}
                            >
                                    <Form.Item 
                                        name="currentPassword"
                                        label={<p className="text-white text-sm leading-5 poppins-semibold">Current Password</p>}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please Enter Current Password!"
                                            }
                                        ]}
                                    >
                                        <Input.Password 
                                        style={{background: "transparent"}}
                                            placeholder="Enter current password"
                                            className="h-12 bg-transparent hover:bg-transparent focus:bg-transparent placeholder:text-gray-500 text-white"
                                        />
                                    </Form.Item>


                                    <Form.Item
                                        name="newPassword"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please Enter New Password!"
                                            }
                                        ]}
                                        label={<p className="text-white text-sm leading-5 poppins-semibold">New Password</p>}
                                        style={{ marginBottom: newPassError ? 0 : null }}
                                    >
                                        <Input.Password 
                                        style={{background: "transparent"}}
                                            placeholder="Enter current password"
                                            className="h-12 bg-transparent hover:bg-transparent focus:bg-transparent placeholder:text-gray-500 text-white"
                                        />
                                    </Form.Item>
                                    { newPassError && <label style={{display: "block", color: "red"}} htmlFor="error">{newPassError}</label>}

                                    <Form.Item 
                                        label={<p className="text-white text-sm leading-5 poppins-semibold">Confirm Password</p>}
                                        name="confirmPassword"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please Enter Confirm Password!"
                                            }
                                        ]}
                                        style={{ marginBottom: conPassError ? 0 : null }}
                                    >
                                        <Input.Password
                                          style={{background: "transparent"}} 
                                            placeholder="Enter current password"
                                            className="h-12 bg-transparent hover:bg-transparent focus:bg-transparent placeholder:text-gray-500 text-white"
                                        />
                                    </Form.Item>
                                    { conPassError && <label style={{display: "block", color: "red"}} htmlFor="error">{conPassError}</label>}

                                <Form.Item 
                                    style={{marginBottom: 0, display: "flex", alignItems: "center", justifyContent: "center"}}
                                >
                                    <Button
                                        
                                        htmlType="submit"
                                        block
                                        style={{
                                            width : 178,
                                            height: 48,
                                            fontWeight: "400px",
                                            background: "red",
                                            color: "#FCFCFC"
                                        }}
                                        className='roboto-medium  text-sm leading-4'
                                    >
                                      {isLoading ? "Changing" : "Update"}
                                    </Button>
                                </Form.Item>
      </Form>
       
      </div>
    </div>
  );
};

export default ChangePassword;
