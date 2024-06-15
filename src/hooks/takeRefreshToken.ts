import { useRefreshTokenMutation } from "../app/redux/api/authApi";
import { selectAuth } from "../app/redux/features/authSlice";
import { useAppSelector } from "./hooks";


export const UseRefreshToken = () => {
  const [refreshToken, { isLoading }] = useRefreshTokenMutation();
const sid = useAppSelector(selectAuth).sid!
console.log(sid);
  const refreshTokenCallback = async () => {
    if (isLoading) return;
    const response = await refreshToken({sid}).unwrap();
    return response;
  };

  return refreshTokenCallback;
};