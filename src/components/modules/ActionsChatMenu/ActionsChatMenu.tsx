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
import { archiveConversation } from 'src/services/conversationService';
import {
  deleteConversationSelected,
  selectConversation,
} from 'src/store/conversationSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

import './ActionsChatMenu.scss';

interface IActionsChatMenuProps extends MenuProps {}

const ActionsChatMenu: React.FC<IActionsChatMenuProps> = () => {
  const { t } = useTranslation('dashboard', {
    keyPrefix: 'chat-ui.chat-header.action-chat-menu',
  });
  const { t: t1 } = useTranslation('common');
  const { selectedConversation } = useAppSelector(selectConversation);
  const dispatch = useAppDispatch();
  const menu: MenuProps['items'] = [
    {
      label: (
        <Button className="menu-item">
          <Title className="menu-item__title">{t('archive')}</Title>
          <InboxOutlined className="custom-menu-icon" />
        </Button>
      ),
      key: 'Archive',
    },
    {
      label: (
        <Button className="menu-item">
          <Title className="menu-item__title">{t('mute')}</Title>
          <AudioMutedOutlined className="custom-menu-icon" />
        </Button>
      ),
      key: 'Mute',
    },
    {
      label: (
        <Button className="menu-item">
          <Title className="menu-item__title">{t('delete')}</Title>
          <DeleteOutlined className="custom-menu-icon" />
        </Button>
      ),
      key: 'Delete',
    },
  ];

  const handleArchiveConversation = async () => {
    if (!selectedConversation) return;
    await archiveConversation(selectedConversation, t1);
    dispatch(deleteConversationSelected());
  };

  const hanldeClickItem: MenuProps['onClick'] = React.useCallback(
    (e: { key: string }) => {
      switch (e.key) {
        case 'Archive': {
          handleArchiveConversation();
          break;
        }
        case 'Mute': {
          break;
        }
        case 'Delete': {
          break;
        }
        default: {
          throw new Error('Error');
        }
      }
    },
    []
  );

  return <Menu className="chat-menu" items={menu} onClick={hanldeClickItem} />;
};

export default ActionsChatMenu;
