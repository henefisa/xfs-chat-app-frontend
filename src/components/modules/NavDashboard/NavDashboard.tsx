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
import * as React from 'react';
import { useState } from 'react';

import Avatar from '@common/Avatar/Avatar';
import Button from '@common/Button/Button';
import Dropdown from '@common/Dropdown/Dropdown';
import Tooltip from '@common/Tooltip/Tooltip';
import { useAppSelector } from 'src/store/hooks';
import { selectUserProfile } from 'src/store/userSlice';
import LanguageMenu from '../LanguageMenu/LanguageMenu';
import UserMenu from '../UserMenu/UserMenu';
import { useAppDispatch } from 'src/store/hooks';
import { updateNavbar } from 'src/store/navbarSlice';

import './NavDashboard.scss';

const navBarMenu = [
  {
    icon: UserOutlined,
    tooltipTitle: 'Profile',
  },
  {
    icon: MessageOutlined,
    tooltipTitle: 'Chats',
  },
  {
    icon: UsergroupAddOutlined,
    tooltipTitle: 'Groups',
  },
  {
    icon: ContactsOutlined,
    tooltipTitle: 'Contacts',
  },
  {
    icon: SettingOutlined,
    tooltipTitle: 'Settings',
  },
];

const NavDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  // Viết tạm state dark/light theme
  const [isDark, setIsDark] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const userProfileStore = useAppSelector(selectUserProfile);

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
              className="menu__item"
              onClick={() => {
                dispatch(updateNavbar(item.tooltipTitle));
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

      <div className="actions">
        <div className="actions__item">
          <Dropdown
            overlay={<LanguageMenu />}
            trigger={['click']}
            placement="topRight"
            className="custom-dropdown-menu"
          >
            <GlobalOutlined />
          </Dropdown>
        </div>
        <div className="actions__item">
          <Button className="actions__button" onClick={handleThemeChange}>
            <Tooltip
              className="custom-nav-icon"
              tooltipTitle="Dark / Light Mode"
              placement="right"
            >
              {isDark ? <ApiOutlined /> : <AlertOutlined />}
            </Tooltip>
          </Button>
        </div>
        <div className="actions__item">
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
