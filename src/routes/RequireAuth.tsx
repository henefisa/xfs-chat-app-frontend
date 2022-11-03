import * as React from 'react';
import { getUserProfile } from 'src/services/userService';
import { useAppDispatch } from 'src/store/hooks';

interface IRequireAuthProps {
  children: React.ReactElement;
  redirectTo: string;
}

const RequireAuth: React.FC<IRequireAuthProps> = ({ children }) => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    getUserProfile(dispatch);
  }, []);

  return children;
};

export default RequireAuth;
