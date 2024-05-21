import React, { useEffect } from 'react';
import AppRoutes from './utils/routes/route';
import './App.css'; 
import { useAppDispatch } from './app/store';
import { loadUser } from './app/redux/features/authSlice';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(loadUser())
  },[dispatch])
  return (
    <div className="Container">
          <AppRoutes  />
    </div>
  );
}

export default App;