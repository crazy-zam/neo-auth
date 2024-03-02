import React from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import EmailValidate from './pages/EmailValidate/EmailValidate';
import Main from './pages/Main/Main';
import { useTypedSelector } from './hooks/useTypedSelector';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';

function App() {
  const { isAuth } = useTypedSelector((state) => state.user);

  return (
    <div className="App">
      {!isAuth ? (
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/registration" element={<Register />} />
          <Route path="/auth/confirmation" element={<EmailValidate />} />
          <Route path="/auth/reset-password" element={<ForgotPassword />} />
          <Route path="*" element={<Navigate to="/auth/login" />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/main" element={<Main />} />
          <Route path="*" element={<Navigate to="/main" />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
