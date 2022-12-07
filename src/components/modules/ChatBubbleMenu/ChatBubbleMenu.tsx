import * as React from 'react';
import { MenuProps } from 'antd';
import { CopyOutlined, SaveOutlined, DeleteOutlined } from '@ant-design/icons';
import Title from '@common/Title/Title';
import Button from '@common/Button/Button';
import clsx from 'clsx';
import ForwardForm from '@modules/ForwardForm/ForwardForm';
import Menu from '@common/Menu/Menu';
import { useTranslation } from 'react-i18next';

import './ChatBubbleMenu.scss';

interface IChatBubbleMenuProps extends MenuProps {
  position: string;
}

const ChatBubbleMenu: React.FC<IChatBubbleMenuProps> = ({ position }) => {
  const { t } = useTranslation('dashboard', {
    keyPrefix: 'chat-ui.chat-main.chat-bubble-menu',
  });
  const menu: MenuProps['items'] = [
    {
      label: (
        <Button className="menu-item">
          <Title className="menu-item__title">{t('copy')}</Title>
          <CopyOutlined className="custom-menu-icon" />
        </Button>
      ),
      key: 0,
    },
    {
      label: (
        <Button className="menu-item">
          <Title className="menu-item__title">{t('muted')}</Title>
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
          <Title className="menu-item__title">{t('delete')}</Title>
          <DeleteOutlined className="custom-menu-icon" />
        </Button>
      ),
      key: 3,
    },
  ];

  return <Menu className={clsx('chat-bubble-menu', position)} items={menu} />;
};
export default ChatBubbleMenu;
