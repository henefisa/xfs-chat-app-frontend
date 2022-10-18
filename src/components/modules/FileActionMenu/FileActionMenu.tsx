import * as React from 'react';
import { Menu, MenuProps } from 'antd';

import Title from '@common/Title/Title';
import Button from '@common/Button/Button';

import './FileActionMenu.scss';

interface IFileActionMenuProps extends MenuProps {}

const menu: MenuProps['items'] = [
  {
    label: (
      <Button className="menu-item">
        <Title className="menu-item__title" level={5}>
          Action
        </Title>
      </Button>
    ),
    key: 0,
  },
  {
    label: (
      <Button className="menu-item">
        <Title className="menu-item__title" level={5}>
          Another Action
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
          Delete
        </Title>
      </Button>
    ),
    key: 2,
  },
];

const FileActionMenu: React.FC<IFileActionMenuProps> = () => {
  return <Menu className="file-menu" items={menu} />;
};

export default FileActionMenu;
