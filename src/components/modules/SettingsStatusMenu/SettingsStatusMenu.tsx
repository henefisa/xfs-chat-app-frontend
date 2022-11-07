import * as React from 'react';
import { MenuProps } from 'antd';

import Title from '@common/Title/Title';
import Button from '@common/Button/Button';
import Menu from '@common/Menu/Menu';

import './SettingsStatusMenu.scss';

interface ISettingsStatusMenu extends MenuProps {}

const menu: MenuProps['items'] = [
  {
    label: (
      <Button className="menu-item">
        <Title className="menu-item__title" level={5}>
          Available
        </Title>
      </Button>
    ),
    key: 0,
  },
  {
    label: (
      <Button className="menu-item">
        <Title className="menu-item__title" level={5}>
          Busy
        </Title>
      </Button>
    ),
    key: 1,
  },
];

const SettingsMenu: React.FC<ISettingsStatusMenu> = () => {
  return <Menu className="settings-status-menu" items={menu} />;
};

export default SettingsMenu;
