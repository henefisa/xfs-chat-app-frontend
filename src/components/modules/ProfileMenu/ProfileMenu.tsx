import * as React from 'react';
import { Menu, MenuProps } from 'antd';

import Title from '@common/Title/Title';
import Button from 'src/components/common/Button/Button';

import './ProfileMenu.scss';

interface IProfileMenuProps extends MenuProps {}

const ProfileMenu: React.FC<IProfileMenuProps> = () => {
  return (
    <Menu
      className="profile-menu"
      items={[
        {
          label: (
            <Button className="menu-item">
              <Title className="menu-item__title" level={5}>
                Edit
              </Title>
            </Button>
          ),
          key: 0,
        },
        {
          label: (
            <Button className="menu-item">
              <Title className="menu-item__title" level={5}>
                Action
              </Title>
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
                Another action
              </Title>
            </Button>
          ),
          key: 2,
        },
      ]}
    />
  );
};

export default ProfileMenu;
