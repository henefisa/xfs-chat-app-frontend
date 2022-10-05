import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage, LoginPage } from 'src/pages';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
