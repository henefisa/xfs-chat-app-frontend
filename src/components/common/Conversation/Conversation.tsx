import * as React from 'react';
import Avatar from '../Avatar/Avatar';
import Title from '../Title/Title';

import './Conversation.scss';

interface ConversationProps {
  path: string,
  name: string,
}

const Conversation: React.FC<ConversationProps> = ({path,name}) => {
  return (
    <div className="conversation-item">
      <div className="conversation-item__avatar">
        <Avatar
          path={path}
          userName="Doris Brown"
          imgWidth={35.2}
          className="avatar"
        />
        <span className="conversation-item__status online" />
      </div>
      <div className="conversation-item__content">
        <div className="conversation-item__content--name">
          <Title className="title">{name}</Title>
        </div>
        <p className="message typing">
          Typing
          <span className="animate-typing">
            <span className="dot ms-1"></span>
            <span className="dot ms-1"></span>
            <span className="dot ms-1"></span>
          </span>
        </p>
      </div>
      <div className="conversation-item__time">10:05</div>
      <div className="conversation-item__unread">
        <span>2</span>
      </div>
    </div>
  );
};

export default Conversation;
