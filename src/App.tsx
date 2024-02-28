import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<Login />} />
        <Route path="/registration" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
