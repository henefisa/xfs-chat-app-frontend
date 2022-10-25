import * as React from 'react';
import Avatar from '../Avatar/Avatar';
import Title from '../Title/Title';

import './Conversation.scss';

const Conversation: React.FC = () => {
  return (
    <div className="conversation-item">
      <div className="conversation__avatar">
        <Avatar
          path="http://chatvia-light.react.themesbrand.com/static/media/avatar-4.b23e41d9c09997efbc21.jpg"
          userName="Doris Brown"
          imgWidth={35.2}
          className="avatar"
        />
        <span className="conversation-item__status online" />
      </div>
      <div className="conversation__content">
        <div className="conversation__content--name">
          <Title className="title">Patrick Hendricks</Title>
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
      <div className="conversation__time">10:05</div>
      <div className="conversation__unread">
        <span>2</span>
      </div>
    </div>
  );
};

export default Conversation;
