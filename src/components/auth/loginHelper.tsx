import { setUser } from '../../app/redux/features/authSlice';
import { LoginResponse } from '../../app/redux/api/types'; 
import { useAppDispatch } from '../../app/store'; 
import { useNavigate } from 'react-router-dom';

export const useLoginHelper = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const login = (loginData: LoginResponse) => {
    dispatch(setUser(loginData));
    const name = loginData.userData?.name;
    if (name) {
      navigate(`/${name}/books`);
    } else {
      console.log('Name is missing in loginData');
    }
  };

  return { login };
};