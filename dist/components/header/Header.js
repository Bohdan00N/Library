import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import css from "./header.module.scss";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/store";
import { toast } from "react-toastify";
import { useAppSelector } from "../../hooks/hooks";
import { logout, selectAuth } from "../../app/redux/features/authSlice";
export const Header = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userName = useAppSelector(selectAuth).userData.name;
    const handleTraining = async () => {
        try {
            navigate("/training");
        }
        catch (error) {
            console.error(error);
        }
    };
    const handleLogout = async () => {
        try {
            dispatch(logout());
            navigate("/auth/login");
            toast.success("Logout success");
        }
        catch (error) {
            // Обрабатываем возможные ошибки
            console.error(error);
        }
    };
    const handleLogo = async () => {
        try {
            navigate("/");
        }
        catch (error) {
            // Обрабатываем возможные ошибки
            console.error(error);
        }
    };
    return (_jsxs("div", { className: css.header, children: [_jsx("button", { className: css.logo, onClick: handleLogo, children: "LIBRARY" }), _jsx("div", { className: css.name, children: `${userName}` }), _jsxs("div", { className: "", children: [_jsx("button", { className: css.btnTrain, onClick: handleTraining, children: "Training" }), _jsx("button", { className: css.buttonLogout, onClick: handleLogout, children: "Logout" })] })] }));
};
