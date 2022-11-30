import * as React from 'react';
import Avatar from '../Avatar/Avatar';
import Title from '../Title/Title';
import { useTranslation } from 'react-i18next';

import './Conversation.scss';

interface ConversationProps {
  path: string | null;
  name: string;
  time: string;
  unread: string;
}

const Conversation: React.FC<ConversationProps> = ({
  path,
  name,
  time,
  unread,
}) => {
  const { t } = useTranslation('dashboard', { keyPrefix: 'sidebar.chats' });

  return (
    <div className="conversation-item">
      <div className="conversation-item__avatar">
        <Avatar
          path={path}
          username="Doris Brown"
          imgWidth={35.2}
          className="avatar"
        />
        <span className="conversation-item__status--online" />
      </div>
      <div className="conversation-item__content">
        <div className="title">
          <Title>{name}</Title>
        </div>
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
