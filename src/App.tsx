import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { initInterceptor } from './api/apiRequest';
import {
  defaultSocketContextState,
  SocketContextProvider,
  socketReducer,
} from './Context/Socket/Context';
import Router from './routes';
import { useAppDispatch } from './store/hooks';

function App() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['common', 'notification']);

  const [SocketState, SocketDispatch] = React.useReducer(
    socketReducer,
    defaultSocketContextState
  );

  React.useLayoutEffect(() => {
    initInterceptor(navigate, dispatch, t);
  }, []);

  return (
    <SocketContextProvider value={{ SocketState, SocketDispatch }}>
      <Router />
    </SocketContextProvider>
  );
}

export default App;
