import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage, LoginPage, RegisterPage, DashboardPage } from 'src/pages';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
