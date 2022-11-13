import {
  AlertOutlined,
  ApiOutlined,
  ContactsOutlined,
  MessageOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import Avatar from '@common/Avatar/Avatar';
import Button from '@common/Button/Button';
import Dropdown from '@common/Dropdown/Dropdown';
import Tooltip from '@common/Tooltip/Tooltip';
import LanguageDropDown from '@modules/LanguageDropDown/LanguageDropDown';
import UserMenu from '@modules/UserMenu/UserMenu';

import * as React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { updateNavbar } from 'src/store/navbarSlice';
import { selectUserProfile } from 'src/store/userSlice';

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
        key: 'profile',
      },
      {
        icon: MessageOutlined,
        tooltipTitle: t('chat'),
        key: 'chat',
      },
      {
        icon: UsergroupAddOutlined,
        tooltipTitle: t('groups'),
        key: 'groups',
      },
      {
        icon: ContactsOutlined,
        tooltipTitle: t('contacts'),
        key: 'contacts',
      },
      {
        icon: SearchOutlined,
        tooltipTitle: t('search'),
        key: 'search',
      },
      {
        icon: SettingOutlined,
        tooltipTitle: t('settings'),
        key: 'settings',
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
                dispatch(updateNavbar(item.key));
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
          <LanguageDropDown placement="topRight" />
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
            placement="topLeft"
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
