import css from "./header.module.scss";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/store";
import { toast } from "react-toastify";
import { useAppSelector } from "../../hooks/hooks";
import { logOut,  selectAuth } from "../../app/redux/features/authSlice";
import { useLogoutMutation } from "../../app/redux/api/authApi";

export const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
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
      await logout();
      dispatch(logOut());
      toast.success("Logout success");
    } catch (error) {
      console.error(error);
    }
  };
  const handleLogo = async () => {
    try {
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={css.header}>
      <a className={css.logo} onClick={handleLogo}>
        LIBRARY
      </a>
      <div className={css.name}>{`${userName}`}</div>
      <div className="">
        <a className={css.btnTrain} onClick={handleTraining}>
          Training
        </a>
        <button className={css.buttonLogout} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};
