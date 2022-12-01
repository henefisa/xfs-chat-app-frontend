import ConversationAvatarGroup from '@modules/ConversationAvatarGroup/ConversationAvatarGroup';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { IConversation } from 'src/models';
import { useAppSelector } from 'src/store/hooks';
import { selectUserProfile } from 'src/store/userSlice';
import handleReturnMemmberWhenNotGroup from 'src/utils/handleReturnMemberWhenNotGroup';
import Avatar from '../Avatar/Avatar';
import Title from '../Title/Title';

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

  return (
    <div className="conversation-item">
      <div className="conversation-item__avatar">
        {conversation.isGroup ? (
          <ConversationAvatarGroup conversation={conversation} />
        ) : (
          <Avatar
            path={
              handleReturnMemmberWhenNotGroup(conversation, userProfileStore)
                ?.avatar
            }
            username={username.charAt(0).toUpperCase()}
            imgWidth={46}
          />
        )}

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
