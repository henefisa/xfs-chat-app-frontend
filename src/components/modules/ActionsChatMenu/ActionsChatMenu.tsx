import * as React from 'react';
import { MenuProps } from 'antd';
import {
  InboxOutlined,
  AudioMutedOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import Title from '@common/Title/Title';
import Button from '@common/Button/Button';
import Menu from '@common/Menu/Menu';

import './ActionsChatMenu.scss';

interface IActionsChatMenuProps extends MenuProps {}

const ActionsChatMenu: React.FC<IActionsChatMenuProps> = () => {
  const menu: MenuProps['items'] = [
    {
      label: (
        <Button className="menu-item">
          <Title className="menu-item__title">Archive</Title>
          <InboxOutlined className="custom-menu-icon" />
        </Button>
      ),
      key: 0,
    },
    {
      label: (
        <Button className="menu-item">
          <Title className="menu-item__title">Muted</Title>
          <AudioMutedOutlined className="custom-menu-icon" />
        </Button>
      ),
      key: 1,
    },
    {
      label: (
        <Button className="menu-item">
          <Title className="menu-item__title">Delete</Title>
          <DeleteOutlined className="custom-menu-icon" />
        </Button>
      ),
      key: 2,
    },
  ];

  return <Menu className="chat-menu" items={menu} />;
};

export default ActionsChatMenu;
