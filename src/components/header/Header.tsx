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
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      dispatch(logout());
      navigate("/auth/login");
      toast.success("Logout success");
    } catch (error) {
      // Обрабатываем возможные ошибки
      console.error(error);
    }
  };
  const handleLogo = async () => {
    try {
      navigate("/");
    } catch (error) {
      // Обрабатываем возможные ошибки
      console.error(error);
    }
  };
  return (
    <div className={css.header}>
      <button className={css.logo} onClick={handleLogo}>
        LIBRARY
      </button>

      <div className={css.name}>{`${userName}`}</div>
      <div className="">
        <button className={css.btnTrain} onClick={handleTraining}>
          Training
        </button>
        <button className={css.buttonLogout} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};
