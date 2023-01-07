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
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { updateNavbar } from 'src/store/navbarSlice';
import { deleteFriendSelected, deleteUserProfile } from 'src/store/userSlice';
import { deleteConversationSelected } from 'src/store/conversationSlice';
import Button from '@common/Button/Button';
import Menu from '@common/Menu/Menu';
import Title from '@common/Title/Title';
import { selectDarkLight } from 'src/store/darkLightSlice';

import './UserMenu.scss';
import clsx from 'clsx';

interface IUserMenuProps extends MenuProps {}

const UserMenu: React.FC<IUserMenuProps> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isDark = useAppSelector(selectDarkLight);

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
        key: 'UserProfile',
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
        key: 'Setting',
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
        key: 'LogOut',
      },
    ];
  }, [t]);

  const handleLogout = async () => {
    await logout(t1);
    dispatch(logoutSuccess());
    dispatch(deleteUserProfile());
    dispatch(deleteFriendSelected());
    dispatch(deleteConversationSelected());
    dispatch(updateNavbar(ENavbar.PROFILE));
    navigate('/login');
  };

  const hanldeClickItem: MenuProps['onClick'] = React.useCallback(
    (e: { key: string }) => {
      switch (e.key) {
        case 'UserProfile': {
          break;
        }
        case 'Setting': {
          break;
        }
        case 'LogOut': {
          handleLogout();
          break;
        }
        default: {
          throw new Error('Error');
        }
      }
    },
    []
  );

  return (
    <Menu
      className={clsx('user-menu', { 'dark-mode': isDark })}
      items={menu}
      onClick={hanldeClickItem}
    />
  );
};

export default UserMenu;
