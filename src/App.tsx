import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { initInterceptor } from './api/apiRequest';
import Router from './routes';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useLayoutEffect(() => {
    initInterceptor(navigate, dispatch);
  }, []);

  return <Router />;
}

export default App;
