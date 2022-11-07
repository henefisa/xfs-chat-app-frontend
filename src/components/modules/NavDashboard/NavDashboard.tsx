import {
  AlertOutlined,
  ApiOutlined,
  ContactsOutlined,
  GlobalOutlined,
  MessageOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Avatar from '@common/Avatar/Avatar';
import Button from '@common/Button/Button';
import Dropdown from '@common/Dropdown/Dropdown';
import Tooltip from '@common/Tooltip/Tooltip';

import * as React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'src/store/hooks';
import { selectUserProfile } from 'src/store/userSlice';
import LanguageMenu from '../LanguageMenu/LanguageMenu';
import UserMenu from '../UserMenu/UserMenu';
import { useAppDispatch } from 'src/store/hooks';
import { updateNavbar } from 'src/store/navbarSlice';

import './NavDashboard.scss';

const NavDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  // Viết tạm state dark/light theme
  const [isDark, setIsDark] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const userProfileStore = useAppSelector(selectUserProfile);
  const { t } = useTranslation('dashboard', { keyPrefix: 'navbar' });

  const navBarMenu = React.useMemo(() => {
    return [
      {
        icon: UserOutlined,
        tooltipTitle: t('profile'),
      },
      {
        icon: MessageOutlined,
        tooltipTitle: t('chat'),
      },
      {
        icon: UsergroupAddOutlined,
        tooltipTitle: t('groups'),
      },
      {
        icon: ContactsOutlined,
        tooltipTitle: t('contacts'),
      },
      {
        icon: SettingOutlined,
        tooltipTitle: t('settings'),
      },
    ];
  }, [t]);

  const handleThemeChange = () => {
    setIsDark(!isDark);
  };

  return (
    <div className="navbar-dash">
      <div className="logo">
        <img className="logo__img" src="/images/logos/logo.svg" alt="Logo" />
      </div>

      <div className="menu-dashboard">
        {navBarMenu.map((item, index) => {
          const MenuIcon = item.icon;
          return (
            <Button
              key={index}
              className="menu-dashboard__btn"
              onClick={() => {
                dispatch(updateNavbar(index));
                setActiveIndex(index);
              }}
            >
              <Tooltip
                className="custom-nav-icon"
                placement="top"
                tooltipTitle={item.tooltipTitle}
                isActive={index === activeIndex ? true : false}
              >
                <MenuIcon />
              </Tooltip>
            </Button>
          );
        })}
      </div>

      <div className="actions-dashboard">
        <div className="actions-dashboard__item">
          <Dropdown
            overlay={<LanguageMenu />}
            trigger={['click']}
            placement="topRight"
            className="custom-dropdown-menu"
          >
            <GlobalOutlined />
          </Dropdown>
        </div>
        <div className="actions-dashboard__item">
          <Button className="btn-theme" onClick={handleThemeChange}>
            <Tooltip
              className="custom-nav-icon"
              tooltipTitle={t('dark-light')}
              placement="right"
            >
              {isDark ? <ApiOutlined /> : <AlertOutlined />}
            </Tooltip>
          </Button>
        </div>
        <div className="actions-dashboard__item">
          <Dropdown
            overlay={<UserMenu />}
            trigger={['click']}
            placement="topRight"
            className="custom-dropdown-menu"
          >
            <Avatar
              path={userProfileStore.avatar ? userProfileStore.avatar : ''}
              username={
                userProfileStore.username
                  ? userProfileStore.username.charAt(0).toUpperCase()
                  : ''
              }
              imgWidth={36}
              className="custom-avatar"
            />
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default NavDashboard;
