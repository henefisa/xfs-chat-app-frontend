import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import getAccessTokenFromStorage from 'src/utils/getAccessToken';
import routes from './routesPath';

const Router: React.FC = () => {
  return (
    <Routes>
      {routes.map((item, index) => {
        const Component: React.FC = item.component;

        return (
          <Route
            key={index}
            path={item.path}
            element={
              item.private ? (
                <RequireAuth redirectTo="/login">
                  <Component />
                </RequireAuth>
              ) : (
                <Component />
              )
            }
          />
        );
      })}
    </Routes>
  );
};

interface IRequireAuthProps {
  children: React.ReactElement;
  redirectTo: string;
}

const RequireAuth: React.FC<IRequireAuthProps> = ({ children, redirectTo }) => {
  const accessToken = getAccessTokenFromStorage();

  return accessToken ? children : <Navigate to={redirectTo} />;
};

export default Router;
