import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { initInterceptor } from './api/apiRequest';
import Router from './routes';
import { useAppDispatch } from './store/hooks';

function App() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  React.useLayoutEffect(() => {
    initInterceptor(navigate, dispatch);
  }, []);

  return <Router />;
}

export default App;
