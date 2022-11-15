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
import { useTranslation } from 'react-i18next';

import './ActionsChatMenu.scss';

interface IActionsChatMenuProps extends MenuProps {}

const ActionsChatMenu: React.FC<IActionsChatMenuProps> = () => {
  const { t } = useTranslation('dashboard', {
    keyPrefix: 'chat-ui.chat-header.action-chat-menu',
  });
  const menu: MenuProps['items'] = [
    {
      label: (
        <Button className="menu-item">
          <Title className="menu-item__title">{t('archive')}</Title>
          <InboxOutlined className="custom-menu-icon" />
        </Button>
      ),
      key: 0,
    },
    {
      label: (
        <Button className="menu-item">
          <Title className="menu-item__title">{t('mute')}</Title>
          <AudioMutedOutlined className="custom-menu-icon" />
        </Button>
      ),
      key: 1,
    },
    {
      label: (
        <Button className="menu-item">
          <Title className="menu-item__title">{t('delete')}</Title>
          <DeleteOutlined className="custom-menu-icon" />
        </Button>
      ),
      key: 2,
    },
  ];

  return <Menu className="chat-menu" items={menu} />;
};

export default ActionsChatMenu;
