import {
  LogoutOutlined,
  ProfileOutlined,
  SettingOutlined,
} from '@ant-design/icons';

import { MenuProps } from 'antd';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ENavbar from 'src/interfaces/ENavbar';
import { logout } from 'src/services/authService';
import { logoutSuccess } from 'src/store/authSlice';
import { useAppDispatch } from 'src/store/hooks';
import { updateNavbar } from 'src/store/navbarSlice';
import { deleteFriendSelected, deleteUserProfile } from 'src/store/userSlice';

import Button from '@common/Button/Button';
import Menu from '@common/Menu/Menu';
import Title from '@common/Title/Title';

import './UserMenu.scss';

interface IUserMenuProps extends MenuProps {}

const UserMenu: React.FC<IUserMenuProps> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { t } = useTranslation('dashboard', { keyPrefix: 'navbar.user-menu' });
  const { t: t1 } = useTranslation(['common', 'notification']);

  const menu: MenuProps['items'] = React.useMemo(() => {
    return [
      {
        label: (
          <Button className="menu-item">
            <Title className="menu-item__title" level={5}>
              {t('profile')}
            </Title>
            <ProfileOutlined className="custom-menu-icon" />
          </Button>
        ),
        key: 0,
      },
      {
        label: (
          <Button className="menu-item">
            <Title className="menu-item__title" level={5}>
              {t('setting')}
            </Title>
            <SettingOutlined className="custom-menu-icon" />
          </Button>
        ),
        key: 1,
      },
      {
        type: 'divider',
      },
      {
        label: (
          <Button className="menu-item">
            <Title className="menu-item__title" level={5}>
              {t('logout')}
            </Title>
            <LogoutOutlined className="custom-menu-icon" />
          </Button>
        ),
        key: 2,
      },
    ];
  }, [t]);

  const handleLogout = async () => {
    await logout(t1);
    dispatch(logoutSuccess());
    dispatch(deleteUserProfile());
    dispatch(deleteFriendSelected());
    dispatch(updateNavbar(ENavbar.PROFILE));
    navigate('/login');
  };

  const hanldeClickItem: MenuProps['onClick'] = (e) => {
    switch (e.key) {
      case '0': {
        break;
      }
      case '1': {
        break;
      }
      case '2': {
        handleLogout();
        break;
      }
      default: {
        throw new Error('Error');
      }
    }
  };

  return <Menu className="user-menu" items={menu} onClick={hanldeClickItem} />;
};

export default UserMenu;
