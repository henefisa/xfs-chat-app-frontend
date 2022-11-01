import * as React from 'react';
import { useDispatch } from 'react-redux';
import { getUserProfile } from 'src/services/userService';

interface IRequireAuthProps {
  children: React.ReactElement;
  redirectTo: string;
}

const RequireAuth: React.FC<IRequireAuthProps> = ({ children }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    getUserProfile(dispatch);
  }, []);

  return children;
};

export default RequireAuth;
