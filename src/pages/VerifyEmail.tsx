import AuthWrapper from "@/components/share/AuthWrapper";
import Title from "@/components/share/Title";
import { useForgotPasswordMutation, useOtpVerifyMutation } from "@/redux/apiSlices/authApi";
import { Button, Form, Input } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [otpVerify, {isLoading}] = useOtpVerifyMutation();
  const [forgotPassword] = useForgotPasswordMutation();
  const {email} = useParams()

  
  const onFinish = async(values: any) => {
    await otpVerify({email: email, code : values?.code}).then((response)=>{
      if(response?.data?.statusCode ===  200){
        Swal.fire({
          title: "Sending",
          text: "Otp Verified Successfully",
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        }).then(()=>{
          navigate(`/auth/set-new-password/${email}`);
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


  const handleResent = async() => {
    await forgotPassword({email: email}).then((response)=>{
      if(response?.data?.statusCode ===  200){
        Swal.fire({
          title: "Sending",
          text: "Otp Send Your Email. Check It",
          icon: "success",
          timer: 1500,
          showConfirmButton: false
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
        <Title className="text-white">Check your email</Title>
        <p>
          We sent a reset link to {"fahim"} enter 5 digit code that mentioned in
          the email
        </p>
      </div>

      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item 
          label="OTP" 
          name="code"
          rules={[
            {
              required: true,
              message: "Enter OTP"
            }
          ]}
        >
          <Input.OTP
            size="large"
            className="otp-input"
            style={{ width: "100%"}}
            length={6}
          />
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

      <p className="text-center mt-10">
        You have not received the email?
        <Button htmlType="button" onClick={handleResent} className="pl-0" type="link">
          Resend
        </Button>
      </p>
    </AuthWrapper>
  );
};

export default VerifyEmail;
