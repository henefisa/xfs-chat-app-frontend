import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { initInterceptor } from 'src/api/apiRequest';
import {
  SocketContextProvider,
  defaultSocketContextState,
} from 'src/context/socket/context';
import Router from 'src/routes';
import { useAppDispatch } from 'src/store/hooks';

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
