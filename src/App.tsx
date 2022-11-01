import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { initInterceptor } from './api/apiRequest';
import Router from './routes';

function App() {
  const navigate = useNavigate();

  React.useLayoutEffect(() => {
    initInterceptor(navigate);
  }, []);

  return <Router />;
}

export default App;
