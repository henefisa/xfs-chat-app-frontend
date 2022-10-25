import * as React from 'react';
import { useState } from 'react';
import {
  UserOutlined,
  MessageOutlined,
  UsergroupAddOutlined,
  ContactsOutlined,
  SettingOutlined,
  GlobalOutlined,
  AlertOutlined,
  ApiOutlined,
} from '@ant-design/icons';

import Tooltip from '@common/Tooltip/Tooltip';
import Dropdown from '@common/Dropdown/Dropdown';
import LanguageMenu from '../LanguageMenu/LanguageMenu';
import UserMenu from '../UserMenu/UserMenu';
import Button from '@common/Button/Button';
import Avatar from '@common/Avatar/Avatar';

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

const activeIndex = 0;

const NavDashboard: React.FC = () => {
  // Viết tạm state dark/light theme
  const [isDark, setIsDark] = useState(false);

  const handleClick = () => {
    setIsDark(!isDark);
  };

  return (
    <div className="navbar-dash">
      <div className="logo">
        <img className="logo__img" src="/images/logos/logo.svg" alt="Logo" />
      </div>

      <div className="menu">
        {navBarMenu.map((item, index) => {
          const MenuIcon = item.icon;
          return (
            <Button key={index} className="menu__item" >
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
          <Button className="actions__button" onClick={handleClick}>
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
              path="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv1xQ7nJI29iWl5Y03OombrIakd-EWulIezA&usqp=CAU"
              userName="A"
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
