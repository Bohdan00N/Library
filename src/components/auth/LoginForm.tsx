import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input, Row, Card } from "antd";
import { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../app/store";
import { useNavigate, Link } from "react-router-dom";
import { useLoginUserMutation } from "../../app/redux/api/authApi";
import { LoginRequest } from "../../app/redux/api/types";
import { setUser } from "../../app/redux/features/authSlice";
import { CustomButton } from "../Button/buttons";

const LoginForm = () => {
  const [form] = Form.useForm();
  
  const [clientReady, setClientReady] = useState<boolean>(false);
  useEffect(() => {
    setClientReady(true);
  }, [form]);
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const [
    loginUser,
    {
      data: loginData,
      isLoading: isLoginLoading,
      isSuccess: isLoginSuccess,
      error: loginError,
    },
  ] = useLoginUserMutation();
  
  const onFinish: SubmitHandler<LoginRequest> = async ({ email, password }) => {
    if (email && password) {
      await loginUser({
        email,
        password,
      });
    } else {
      console.log(loginError);
    }
  };

  useEffect(() => {
    if (isLoginSuccess) {
      const name = loginData?.userData?.name;
      const token = loginData!.accessToken ?? "";
      if (name && token) {
        dispatch(
          setUser({
            name: name,
            token: token,
          })
        );
      }
      navigate(`/${name}/books`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoginSuccess]);

  return (
    <div style={{ marginTop: "12vh" }}>
      <Row align="middle" justify="center">
        <Card
          title="Welcome, log in to enter your library"
          headStyle={{
            textAlign: "center",
            fontSize: "25px",
            marginTop: "10px",
            border: 0,
          }}
          style={{
            background: "transparent",
            border: "3px solid rgba(24, 199, 187,0.5)",
            borderRadius: "20px",
            backdropFilter: "blur(15px)",
            width: "30rem",
          }}
        >
          <Form
            form={form}
            name="login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                { required: true, message: "Please input your E-mail!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="××××××@××.××"
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                  whitespace: true,
                },
                ({ getFieldValue }) => ({
                  validator() {
                    if (getFieldValue("password").length >= 8) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The password has to be longer than 8 characters!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                maxLength={20}
              />
            </Form.Item>
            <Form.Item>
              <a className="login-form-forgot" href="/">
                Forgot password
              </a>
            </Form.Item>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "auto",
              }}
            >
              <Form.Item shouldUpdate>
                {() => (
                  <CustomButton
                    type="primary"
                    htmlType="submit"
                    size="small"
                    disabled={
                      !clientReady ||
                      !form.isFieldsTouched(true) ||
                      !!form
                        .getFieldsError()
                        .filter(({ errors }) => errors.length).length
                    }
                    loading={isLoginLoading}
                  >
                    Log in
                  </CustomButton>
                )}
              </Form.Item>
              <Link
                to="/auth/register"
                style={{ fontSize: "15px", fontWeight: "500" }}
              >
                Register Here
              </Link>
            </div>
          </Form>
        </Card>
      </Row>
    </div>
  );
};

export default LoginForm;