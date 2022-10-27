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
            <Button key={index} className="menu__item">
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
              path="https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-6/277551484_1607305416300980_1426726336589949572_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=NDE6kmkwFQ8AX9-U3bh&_nc_ht=scontent.fdad3-1.fna&oh=00_AT8SGcvhT_y6-Lc16cMBv0OwsUOg0x7ef7Yp1yb_1teoEQ&oe=635BDBD2"
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
