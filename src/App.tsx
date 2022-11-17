import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { initInterceptor } from './api/apiRequest';
import {
  SocketContextProvider,
  defaultSocketContextState,
} from 'src/context/socket/context';
import Router from './routes';
import { useAppDispatch } from './store/hooks';

function App() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['common', 'notification']);

  React.useLayoutEffect(() => {
    initInterceptor(navigate, dispatch, t);
  }, []);

  return (
    <SocketContextProvider value={defaultSocketContextState}>
      <Router />
    </SocketContextProvider>
  );
}

export default App;
