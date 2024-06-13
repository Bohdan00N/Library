import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, Form, Input, Row } from "antd";
import { useEffect, useState } from "react";
import { useRegisterUserMutation } from "../../app/redux/api/authApi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CustomButton } from "../Button/buttons";
const RegisterForm = () => {
    const [form] = Form.useForm();
    const [clientReady, setClientReady] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        setClientReady(true);
    }, [form]);
    const [registerUser, { data: registerData, isLoading: isRegisterLoading, isSuccess: isRegisterSuccess, },] = useRegisterUserMutation();
    const onFinish = async ({ name, email, password, }) => {
        try {
            if (name && email && password) {
                await registerUser({
                    name,
                    email,
                    password,
                });
            }
        }
        catch (error) {
            if (error === 409) {
                toast.error("Пользователь с таким адресом электронной почты уже существует");
            }
            else {
                toast.error("Произошла ошибка во время регистрации");
            }
        }
    };
    useEffect(() => {
        if (isRegisterSuccess && registerData) {
            toast.success("User register successfully");
            navigate("/auth/login");
        }
    }, [isRegisterSuccess, navigate, registerData]);
    return (_jsx("div", { style: { marginTop: "12vh" }, children: _jsx(Row, { align: "middle", justify: "center", children: _jsx(Card, { title: "Sign Up", styles: {
                    header: {
                        textAlign: "center",
                        fontSize: "25px",
                        marginTop: "10px",
                        border: 0,
                    },
                }, style: {
                    background: "rgb(45, 114, 114)",
                    border: "3px solid rgba(24, 199, 187,0.5)",
                    borderRadius: "20px",
                    width: "30rem",
                    maxHeight: "37rem",
                }, children: _jsxs(Form, { form: form, name: "register", onFinish: onFinish, initialValues: { remember: true }, scrollToFirstError: true, children: [_jsx(Form.Item, { name: "name", label: "Name", tooltip: "What do you want others to call you?", rules: [
                                {
                                    required: true,
                                    message: "Please input your name!",
                                    whitespace: true,
                                },
                            ], children: _jsx(Input, { placeholder: "Write your name" }) }), _jsx(Form.Item, { name: "email", label: "E-mail", rules: [
                                {
                                    type: "email",
                                    message: "The input is not valid E-mail!",
                                },
                                {
                                    required: true,
                                    message: "Please input your E-mail!",
                                },
                            ], children: _jsx(Input, { placeholder: "\u00D7\u00D7\u00D7\u00D7\u00D7\u00D7@\u00D7\u00D7.\u00D7\u00D7" }) }), _jsx(Form.Item, { name: "password", label: "Password", rules: [
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
                                        return Promise.reject(new Error("The password has to be longer than 8 characters!"));
                                    },
                                }),
                            ], hasFeedback: true, children: _jsx(Input.Password, { showCount: true, maxLength: 20, placeholder: "Write the password" }) }), _jsx(Form.Item, { name: "confirm", label: "Confirm Password", dependencies: ["password"], rules: [
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
                                        return Promise.reject(new Error("The password that you entered do not match!"));
                                    },
                                }),
                            ], hasFeedback: true, children: _jsx(Input.Password, { showCount: true, maxLength: 20, placeholder: "Confirm your password" }) }), _jsxs("div", { style: {
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                margin: "auto",
                            }, children: [_jsx(Form.Item, { shouldUpdate: true, children: () => (_jsx(CustomButton, { type: "primary", htmlType: "submit", size: "large", loading: isRegisterLoading, disabled: !clientReady ||
                                            !form.isFieldsTouched(true) ||
                                            !!form
                                                .getFieldsError()
                                                .filter(({ errors }) => errors.length).length, children: "Register" })) }), _jsx(Link, { style: { color: "lightblue", fontSize: "15px", fontWeight: "500" }, to: "/auth/login", children: "Login Here" })] })] }) }) }) }));
};
export default RegisterForm;
