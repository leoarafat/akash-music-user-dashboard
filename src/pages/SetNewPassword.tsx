import AuthWrapper from "@/components/share/AuthWrapper";
import Title from "@/components/share/Title";
import { useResetPasswordMutation } from "@/redux/apiSlices/authApi";
import { Button, Form, Input } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";


const SetNewPassword = () => {
  const navigate = useNavigate();
  const [ resetPassword ] = useResetPasswordMutation();
  const {email} = useParams();

  const onFinish = async(values: any) => {
    await resetPassword({...values, email: email}).then((response)=>{
      if(response?.data?.statusCode ===  200){
        Swal.fire({
          title: "Reset",
          text: "Reset Password Successfully",
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        }).then(()=>{
          navigate("/auth/login");
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
        <Title className="text-white">Set a new password</Title>
        <p>
          Create a new password. Ensure it differs from previous ones for
          security
        </p>
      </div>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="New password" name="newPassword">
          <Input.Password
            placeholder="Write new password"
            style={{ height: "50px" }}
          />
        </Form.Item>
        <Form.Item label="Confirm Password" name="confirmPassword">
          <Input.Password
            placeholder="Write confirm password"
            style={{ height: "50px" }}
          />
        </Form.Item>

        <Form.Item>
          <Button
            className="bg-secondary h-12 text-white text-lg w-full mt-6"
            htmlType="submit"
          >
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </AuthWrapper>
  );
};

export default SetNewPassword;
