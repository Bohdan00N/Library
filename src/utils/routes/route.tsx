import React from "react";
import { useAppSelector } from "../../hooks/hooks";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../../Pages/Home/HomePage";
import LoginPage from "../../Pages/Login/LoginPage";
import RegisterPage from "../../Pages/Register/RegisterPage";
import TrainingPage from "../../Pages/Training/TrainingPage";
import { selectAuth } from "../../app/redux/features/authSlice";

const AppRoutes: React.FC = () => {
  const token = useAppSelector(selectAuth).accessToken;

  return (
    <Routes>
      {token ? (
        <>
          <Route path="/" element={<Navigate to="/:user/books" />} />
          <Route path="/:user/books" element={<HomePage />} />
          <Route path="/training" element={<TrainingPage />} />
          {/* Add other authenticated routes here */}
        </>
      ) : (
        <>
          <Route path="/" element={<Navigate to="/auth/login" />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/auth/login" />} />
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;