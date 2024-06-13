import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAppSelector } from "../../hooks/hooks";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../../Pages/Home/HomePage";
import LoginPage from "../../Pages/Login/LoginPage";
import RegisterPage from "../../Pages/Register/RegisterPage";
import TrainingPage from "../../Pages/Training/TrainingPage";
import { selectAuth } from "../../app/redux/features/authSlice";
const AppRoutes = () => {
    const token = useAppSelector(selectAuth).accessToken;
    if (token) {
        return (_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Navigate, { to: "/:user/books" }) }), _jsx(Route, { index: true, path: "/:user/books", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/training", element: _jsx(TrainingPage, {}) })] }));
    }
    else {
        return (_jsxs(Routes, { children: [_jsx(Route, { index: true, element: _jsx(Navigate, { to: "/auth/login" }) }), _jsx(Route, { path: "/auth/login", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "/auth/register", element: _jsx(RegisterPage, {}) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/auth/login" }) })] }));
    }
};
export default AppRoutes;
