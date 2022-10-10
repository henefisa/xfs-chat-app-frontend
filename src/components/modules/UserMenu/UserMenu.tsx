import * as React from 'react';
import { Menu, MenuProps } from 'antd';
import {
  SettingOutlined,
  ProfileOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

import Title from '@common/Title/Title';
import Button from 'src/components/common/Button/Button';

import './UserMenu.scss';

interface IMenuProps extends MenuProps {}

// const menu = [
//   {
//     label: (
//       <Button className='menu-item'>
//         <Title className="menu-item__title" level={5}>
//           Profile
//         </Title>
//         <ProfileOutlined />
//       </Button>
//     ),
//     key: 0,
//   },
//   {
//     label: (
//       <Button className='menu-item'>
//         <Title className="menu-item__title" level={5}>
//           Settings
//         </Title>
//         <SettingOutlined />
//       </Button>
//     ),
//     key: 1,
//   },
//   {
//     type: 'divider',
//   },
//   {
//     label: (
//       <Button className='menu-item'>
//         <Title className="menu-item__title" level={5}>
//           Logout
//         </Title>
//         <LogoutOutlined />
//       </Button>
//     ),
//     key: 2,
//   },
// ];

const UserMenu: React.FC<IMenuProps> = () => {
  return (
    <Menu
      className="user-menu"
      items={[
        {
          label: (
            <Button className="menu-item">
              <Title className="menu-item__title" level={5}>
                Profile
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
                Settings
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
                Logout
              </Title>
              <LogoutOutlined className="custom-menu-icon" />
            </Button>
          ),
          key: 2,
        },
      ]}
    />
  );
};

export default UserMenu;
