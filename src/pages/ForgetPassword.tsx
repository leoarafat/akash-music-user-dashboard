import AuthWrapper from "@/components/share/AuthWrapper";
import Title from "@/components/share/Title";
import { useForgotPasswordMutation } from "@/redux/apiSlices/authApi";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [forgotPassword, {isLoading}] = useForgotPasswordMutation();


  const onFinish = async(values: any) => {
    await forgotPassword({email: values?.email}).then((response)=>{
      if(response?.data?.statusCode ===  200){
        Swal.fire({
          title: "Sending",
          text: "Otp Send Your Email. Check It",
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        }).then(()=>{
          navigate(`/auth/verify/${values?.email}`);
        })
      }else{
        Swal.fire({
          title: "Oops",
          text: response?.error?.data?.message,
          icon: "error",
          timer: 1500,
          showConfirmButton: false
        })
      }
    })
  };



  return (
    <AuthWrapper>
      <div className="text-center mb-12">
        <Title className="text-white">Forget Password</Title>
        <p>Please enter your email and click send</p>
      </div>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item 
          label="Email" 
          name="email"
          rules={[
            {
              required: true,
              message: "Enter Email"
            }
          ]}
        >
          <Input placeholder="Enter your email" style={{ height: "50px" }} />
        </Form.Item>

        <Form.Item>
          <Button
            className="bg-secondary h-12 text-white text-lg w-full mt-6"
            htmlType="submit"
          >
            { isLoading ? "Sending" : "Send"}
          </Button>
        </Form.Item>
      </Form>
    </AuthWrapper>
  );
};

export default ForgetPassword;
