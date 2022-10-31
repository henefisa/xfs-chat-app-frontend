import * as React from 'react';
import { Menu, MenuProps, message } from 'antd';
import {
  CopyOutlined,
  SaveOutlined,
  RightSquareOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import Title from '@common/Title/Title';
import Button from '@common/Button/Button';
import clsx from 'clsx';

import './ChatBubbleMenu.scss';

interface IChatBubbleMenuProps extends MenuProps {
  position: string;
}

const menu: MenuProps['items'] = [
  {
    label: (
      <Button className="menu-item">
        <Title className="menu-item__title">Copy</Title>
        <CopyOutlined className="custom-menu-icon" />
      </Button>
    ),
    key: 0,
  },
  {
    label: (
      <Button className="menu-item">
        <Title className="menu-item__title">Muted</Title>
        <SaveOutlined className="custom-menu-icon" />
      </Button>
    ),
    key: 1,
  },
  {
    label: (
      <Button className="menu-item">
        <Title className="menu-item__title">Forward</Title>
        <RightSquareOutlined className="custom-menu-icon" />
      </Button>
    ),
    key: 2,
  },
  {
    label: (
      <Button className="menu-item">
        <Title className="menu-item__title">Delete</Title>
        <DeleteOutlined className="custom-menu-icon" />
      </Button>
    ),
    key: 3,
  },
];

const onClick: MenuProps['onClick'] = ({ key }) => {
  message.info(`Click on item ${key}`);
};

const ChatBubbleMenu: React.FC<IChatBubbleMenuProps> = ({
  className,
  position,
  ...rest
}) => {
  return (
    <Menu
      className={clsx(`chat-bubble-menu ${position}`, className)}
      {...rest}
      items={menu}
      onClick={onClick}
    />
  );
};
export default ChatBubbleMenu;
