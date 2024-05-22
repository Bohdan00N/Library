import { setUser } from '../../app/redux/features/authSlice'; // Замените на правильный путь
import { LoginResponse } from '../../app/redux/api/types'; // Замените на правильный путь
import { useAppDispatch } from '../../app/store'; // Убедитесь, что путь к useAppDispatch правильный
import { useNavigate } from 'react-router-dom';

export const useLoginHelper = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const login = (loginData: LoginResponse) => {
    dispatch(setUser(loginData));
    const name = loginData.userData?.name;
    if (name) {
      console.log(`Navigating to /${name}/books`); // Логирование перед навигацией
      navigate(`/${name}/books`);
    } else {
      console.log('Name is missing in loginData');
    }
  };

  return { login };
};