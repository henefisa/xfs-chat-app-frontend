import {
  LogoutOutlined,
  ProfileOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Menu, MenuProps, notification } from 'antd';
import * as React from 'react';

import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'src/store/hooks';
import { logoutStart, logoutSuccess } from 'src/store/authSlice';
import { deleteUserProfile } from 'src/store/userSlice';
import Button from '@common/Button/Button';
import Title from '@common/Title/Title';

import './UserMenu.scss';

interface IMenuProps extends MenuProps {}

const menu: MenuProps['items'] = [
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
];

const UserMenu: React.FC<IMenuProps> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutStart());
    dispatch(logoutSuccess());
    dispatch(deleteUserProfile());
    notification.success({
      message: 'Success',
      description: 'Đăng xuất thành công.',
      duration: 2,
    });
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
