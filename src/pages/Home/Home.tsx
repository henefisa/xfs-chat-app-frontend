import * as React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectLoginStore } from 'src/store/authSlice';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const loginStore = useSelector(selectLoginStore);

  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (loginStore.currentAccessToken && loginStore.isLoggedIn) {
      timeoutId = setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return <div>THIS IS HOME PAGE</div>;
};

export default HomePage;
