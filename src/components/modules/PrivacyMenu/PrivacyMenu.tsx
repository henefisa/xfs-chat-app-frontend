import * as React from 'react';
import { MenuProps } from 'antd';

import Title from '@common/Title/Title';
import Button from '@common/Button/Button';
import Menu from '@common/Menu/Menu';

import './PrivacyMenu.scss';

interface IPrivacyMenuProps extends MenuProps {}

const menu: MenuProps['items'] = [
  {
    label: (
      <Button className="menu-item">
        <Title className="menu-item__title" level={5}>
          Everyone
        </Title>
      </Button>
    ),
    key: 0,
  },
  {
    label: (
      <Button className="menu-item">
        <Title className="menu-item__title" level={5}>
          Selected
        </Title>
      </Button>
    ),
    key: 1,
  },
  {
    label: (
      <Button className="menu-item">
        <Title className="menu-item__title" level={5}>
          Nobody
        </Title>
      </Button>
    ),
    key: 2,
  },
];

const PrivacyMenu: React.FC<IPrivacyMenuProps> = () => {
  return <Menu className="privacy-menu" items={menu} />;
};

export default PrivacyMenu;
