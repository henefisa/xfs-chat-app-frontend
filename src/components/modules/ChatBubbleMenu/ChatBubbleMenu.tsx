import * as React from 'react';
import { MenuProps } from 'antd';
import { CopyOutlined, SaveOutlined, DeleteOutlined } from '@ant-design/icons';
import Title from '@common/Title/Title';
import Button from '@common/Button/Button';
import clsx from 'clsx';
import ForwardForm from '../ForwardForm/ForwardForm';
import Menu from '@common/Menu/Menu';

import './ChatBubbleMenu.scss';

interface IChatBubbleMenuProps extends MenuProps {
  position: string;
}

const ChatBubbleMenu: React.FC<IChatBubbleMenuProps> = ({ position }) => {
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
      label: <ForwardForm />,
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

  return <Menu className={clsx('chat-bubble-menu', position)} items={menu} />;
};
export default ChatBubbleMenu;
