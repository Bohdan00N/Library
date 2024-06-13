import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input, Row, Card } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLoginUserMutation } from "../../app/redux/api/authApi";
import { CustomButton } from "../Button/buttons";
import { useLoginHelper } from "./loginHelper";
const LoginForm = () => {
    const [form] = Form.useForm();
    const [clientReady, setClientReady] = useState(false);
    useEffect(() => {
        setClientReady(true);
    }, [form]);
    const { login } = useLoginHelper();
    const [loginUser, { data: loginData, isLoading: isLoginLoading, isSuccess: isLoginSuccess, error: loginError, },] = useLoginUserMutation();
    const onFinish = async ({ email, password }) => {
        if (email && password) {
            await loginUser({ email, password });
        }
        else {
            console.log(loginError);
        }
    };
    useEffect(() => {
        if (isLoginSuccess && loginData) {
            login(loginData);
        }
    }, [isLoginSuccess, loginData, login]);
    return (_jsx("div", { style: { marginTop: "12vh" }, children: _jsx(Row, { align: "middle", justify: "center", children: _jsx(Card, { title: "Welcome, log in to enter your library", styles: {
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
                }, children: _jsxs(Form, { form: form, name: "login", className: "login-form", initialValues: { remember: true }, onFinish: onFinish, children: [_jsx(Form.Item, { name: "email", label: "E-mail", rules: [
                                {
                                    type: "email",
                                    message: "The input is not valid E-mail!",
                                },
                                { required: true, message: "Please input your E-mail!" },
                            ], children: _jsx(Input, { prefix: _jsx(UserOutlined, { className: "site-form-item-icon" }), placeholder: "\u00D7\u00D7\u00D7\u00D7\u00D7\u00D7@\u00D7\u00D7.\u00D7\u00D7" }) }), _jsx(Form.Item, { label: "Password", name: "password", rules: [
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
                            ], children: _jsx(Input, { prefix: _jsx(LockOutlined, { className: "site-form-item-icon" }), type: "password", placeholder: "Password", maxLength: 20 }) }), _jsxs("div", { style: {
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                margin: "auto",
                            }, children: [_jsx(Form.Item, { shouldUpdate: true, children: () => (_jsx(CustomButton, { type: "primary", htmlType: "submit", size: "small", disabled: !clientReady ||
                                            !form.isFieldsTouched(true) ||
                                            !!form
                                                .getFieldsError()
                                                .filter(({ errors }) => errors.length).length, loading: isLoginLoading, children: "Log in" })) }), _jsx(Link, { to: "/auth/register", style: { color: "lightblue", fontSize: "15px", fontWeight: "500" }, children: "Register Here" })] })] }) }) }) }));
};
export default LoginForm;
