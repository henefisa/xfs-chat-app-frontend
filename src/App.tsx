import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { initInterceptor } from './api/apiRequest';
import Router from './routes';
import { useAppDispatch } from './store/hooks';

function App() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation('notification');

  React.useLayoutEffect(() => {
    initInterceptor(navigate, dispatch, t);
  }, []);

  return <Router />;
}

export default App;
