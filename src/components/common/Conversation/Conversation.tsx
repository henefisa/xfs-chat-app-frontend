import * as React from 'react';
import Avatar from '@common/Avatar/Avatar';
import Title from '@common/Title/Title';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'src/store/hooks';
import { selectUserProfile } from 'src/store/userSlice';
import { IConversation } from 'src/models';
import getMemberConversation from 'src/utils/getMemberConversation';
import AvatarGroupChat from '@modules/AvatarGroupChat/AvatarGroupChat';
import { selectDarkLight } from 'src/store/darkLightSlice';
import clsx from 'clsx';

import './Conversation.scss';

interface ConversationProps {
  conversation: IConversation;
  name: string;
  time: string;
  unread: string;
  username: string;
}

const Conversation: React.FC<ConversationProps> = ({
  conversation,
  name,
  time,
  unread,
  username,
}) => {
  const { t } = useTranslation('dashboard', { keyPrefix: 'sidebar.chats' });
  const userProfileStore = useAppSelector(selectUserProfile);
  const isDark = useAppSelector(selectDarkLight);

  return (
    <div className={clsx('conversation-item', { 'dark-mode': isDark })}>
      <div className="conversation-item__avatar">
        {conversation.isGroup ? (
          <AvatarGroupChat conversation={conversation} imgWidth={26} />
        ) : (
          <Avatar
            path={getMemberConversation(conversation, userProfileStore)?.avatar}
            username={username.charAt(0).toUpperCase()}
            imgWidth={46}
            className="avatar"
          />
        )}
        <span className="conversation-item__status--online" />
      </div>
      <div className="conversation-item__content">
        <Title className="conversation-title">{name}</Title>
        <p className="message typing">
          {t('typing')}
          <span className="animate-typing">
            <span className="dot ms-1"></span>
            <span className="dot ms-1"></span>
            <span className="dot ms-1"></span>
          </span>
        </p>
      </div>
      <div className="conversation-item__time">{time}</div>
      <div className="conversation-item__unread">
        <span>{unread}</span>
      </div>
    </div>
  );
};

export default Conversation;
