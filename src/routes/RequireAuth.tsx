import * as React from 'react';
import { Navigate } from 'react-router-dom';
import getAccessTokenFromStorage from 'src/utils/getAccessToken';

interface IRequireAuthProps {
  children: React.ReactElement;
  redirectTo: string;
}

const RequireAuth: React.FC<IRequireAuthProps> = ({ children, redirectTo }) => {
  const accessToken = getAccessTokenFromStorage();

  return accessToken ? children : <Navigate to={redirectTo} />;
};

export default RequireAuth;
