import { notification } from 'antd';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import * as authService from 'src/services/authService';
import { getUserProfile } from 'src/services/userService';
import { useAppDispatch } from 'src/store/hooks';

interface IRequireAuthProps {
  children: React.ReactElement;
}

const RequireAuth: React.FC<IRequireAuthProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation([
    'login',
    'common',
    'notification',
    'verify-account',
  ]);

  React.useEffect(() => {
    const handleCheckUserActive = async () => {
      try {
        const isActivated: boolean = await authService.checkUserActivate(t);

        if (!isActivated && location.pathname !== '/verify-account') {
          notification.warning({
            message: t('warning', { ns: 'common' }),
            description: t('required-active', { ns: 'verify-account' }),
            duration: 2,
            key: '1',
          });
          navigate('/verify-account');
          return;
        }

        if (isActivated && location.pathname === '/verify-account') {
          notification.info({
            message: t('info', { ns: 'common' }),
            description: t('activated', { ns: 'verify-account' }),
            duration: 2,
            key: '1',
          });
          navigate('/');
          return;
        }

        if (isActivated) {
          getUserProfile(dispatch);
        }
      } catch (err) {
        // do something
      }
    };

    handleCheckUserActive();
  }, [location.pathname]);

  return children;
};

export default RequireAuth;
