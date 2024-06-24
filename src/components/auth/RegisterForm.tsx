import { Card, Form, Input, Row } from "antd";
import { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useRegisterUserMutation } from "../../app/redux/api/authApi";
import { Link, useNavigate } from "react-router-dom";
import { RegisterRequest } from "../../app/redux/api/types";
import { CustomButton } from "../Button/buttons";
import Notiflix from "notiflix";

const RegisterForm = () => {
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setClientReady(true);
  }, [form]);

  const [
    registerUser,
    {
      data: registerData,
      isLoading: isRegisterLoading,
      isSuccess: isRegisterSuccess,
    },
  ] = useRegisterUserMutation();

  const onFinish: SubmitHandler<RegisterRequest> = async ({
    name,
    email,
    password,
  }) => {
    try {
      if (name && email && password) {
        await registerUser({
          name,
          email,
          password,
        });
      }
    } catch (error) {
      if (error === 409) {
        Notiflix.Notify.failure(
          "User with this email already exists"
        );
      } else {
        Notiflix.Notify.failure("Try again");
      }
    }
  };

  useEffect(() => {
    if (isRegisterSuccess && registerData) {
      Notiflix.Notify.success("User register successfully");
      navigate("/auth/login");
    }
  }, [isRegisterSuccess, navigate, registerData]);

  return (
    <div style={{ marginTop: "12vh" }}>
      <Row align="middle" justify="center">
        <Card
          title="Sign Up"
          styles={{
            header: {
              textAlign: "center",
              fontSize: "25px",
              marginTop: "10px",
              border: 0,
            },
          }}
          style={{
            background: "rgb(45, 114, 114)",
            border: "3px solid rgba(24, 199, 187,0.5)",
            borderRadius: "20px",
            width: "30rem",
            maxHeight: "37rem",
          }}
        >
          <Form
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{ remember: true }}
            scrollToFirstError
          >
            <Form.Item
              name="name"
              label="Name"
              tooltip="What do you want others to call you?"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                  whitespace: true,
                },
              ]}
            >
              <Input placeholder="Write your name" />
            </Form.Item>
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input placeholder="××××××@××.××" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
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
              hasFeedback
            >
              <Input.Password
                showCount
                maxLength={20}
                placeholder="Write the password"
              />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                  whitespace: true,
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The password that you entered do not match!")
                    );
                  },
                }),
              ]}
              hasFeedback
            >
              <Input.Password
                showCount
                maxLength={20}
                placeholder="Confirm your password"
              />
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
                    size="large"
                    loading={isRegisterLoading}
                    disabled={
                      !clientReady ||
                      !form.isFieldsTouched(true) ||
                      !!form
                        .getFieldsError()
                        .filter(({ errors }) => errors.length).length
                    }
                  >
                    Register
                  </CustomButton>
                )}
              </Form.Item>
              <Link
                style={{ color: "lightblue", fontSize: "15px", fontWeight: "500" }}
                to="/auth/login"
              >
                Login Here
              </Link>
            </div>
          </Form>
        </Card>
      </Row>
    </div>
  );
};

export default RegisterForm;
