import css from "./header.module.scss";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/store";
import { toast } from "react-toastify";
import { useAppSelector } from "../../hooks/hooks";
import { logout, selectAuth } from "../../app/redux/features/authSlice";

export const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userName = useAppSelector(selectAuth).userData.name;
  const handleLogout = async () => {
    try {
      dispatch(logout());
      navigate("/auth/login");
      toast.success("Logout success");
    } catch (error) {
      // Обрабатываем возможные ошибки
      console.error("Ошибка при выходе:", error);
    }
  };

  return (
    <div className={css.header}>
      <p className={css.logo}>LIBRARY</p>
      <div className={css.name}>{`${userName}`}</div>
      <Button className={css.buttonLogout} onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};
