import React from "react";
import { useAppSelector } from "../../hooks/hooks";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../../Pages/Home/HomePage";
import LoginPage from "../../Pages/Login/LoginPage";
import RegisterPage from "../../Pages/Register/RegisterPage";
import { selectAuth } from "../../app/redux/features/authSlice";

const AppRoutes: React.FC = () => {
  const token = useAppSelector(selectAuth).accessToken;

  if (token) {
    return (
      <Routes>
        <Route index path="/:user/books" element={<HomePage />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route index element={<Navigate to="/auth/login" />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/auth/login" />} />
      </Routes>
    );
  }
};

export default AppRoutes;
