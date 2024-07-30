import AuthWrapper from "@/components/share/AuthWrapper";
import Title from "@/components/share/Title";
import { useAdminLoginMutation } from "@/redux/apiSlices/authApi";
import { setToLocalStorage } from "@/util/local-storage";
import { Button, Checkbox, Form, Input } from "antd";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const [loginUser, { isError, isSuccess, error, data }] =
    useAdminLoginMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      if (data) {
        Swal.fire({
          title: "Login Successful",
          text: "Welcome to K9 Academy",
          icon: "success",
          timer: 1500,
        }).then(()=>{
          setToLocalStorage("dentistAuthToken", data?.data?.accessToken);
          navigate("/");
          window.location.reload()
        })
      }
    }
  }, [data, isSuccess, navigate]);

  useEffect(() => {
    if (isError) {
      Swal.fire({
        title: "Failed to Login",
        text: error?.data?.message,
        icon: "error",
      });
    }
  }, [error, isError]);

  const onFinish = async (values: any) => {
    const data = {
      email: values.email,
      password: values.password,
    };
    await loginUser(data)
  };
  return (
    <AuthWrapper>
      <div className="text-center mb-12">
        <Title className="text-white" >Login to Account</Title>
        <p>Please enter your email and password to continue</p>
      </div>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Email" name="email">
          <Input placeholder="Enter your email" style={{ height: "50px" }} />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input.Password
            placeholder="Enter your password"
            style={{ height: "50px" }}
          />
        </Form.Item>
        <Form.Item>
          <div className="flex justify-between items-center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Link className="login-form-forgot" to="/auth/forget-password">
              Forgot password
            </Link>
          </div>
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

export default Login;
