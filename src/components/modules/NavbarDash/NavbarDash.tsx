import * as React from 'react';
import {
  UserOutlined,
  MessageOutlined,
  UsergroupAddOutlined,
  ContactsOutlined,
  SettingOutlined,
  GlobalOutlined,
} from '@ant-design/icons';

import Tooltip from '@common/Tooltip/Tooltip';

import './NavbarDash.scss';

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

const NavbarDash: React.FC = () => {
  return (
    <div className="navbar-dash">
      <div className="logo">
        <img className="logo__img" src="/images/logos/logo.svg" alt="Logo" />
      </div>

      <div className="menu">
        {navBarMenu.map((item, index) => {
          const MenuIcon = item.icon;
          return (
            <div key={index} className="menu__item">
              <Tooltip
                className="custom-nav-icon"
                placement="top"
                tooltipTitle={item.tooltipTitle}
                isActive={index === activeIndex ? true : false}
              >
                <MenuIcon />
              </Tooltip>
            </div>
          );
        })}
      </div>

      <div className="actions">
        <div className="actions__item">
          <Tooltip className="custom-nav-icon">
            <GlobalOutlined />
          </Tooltip>
        </div>
        <div className="actions__item">
          <Tooltip className="custom-nav-icon">
            <GlobalOutlined />
          </Tooltip>
        </div>
        <div className="actions__item">
          <Tooltip className="custom-nav-icon">
            <GlobalOutlined />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default NavbarDash;
