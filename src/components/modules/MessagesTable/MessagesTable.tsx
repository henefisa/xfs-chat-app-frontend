import React from 'react';
import Avatar from '@common/Avatar/Avatar';
import Title from '@common/Title/Title';
import MessagesContent from '@modules/MessagesContent/MessagesContent';
import clsx from 'clsx';

import './MessagesTable.scss';

interface IMessagesTableProps {
  position: string;
  messages: string;
}

const MessagesTable: React.FC<IMessagesTableProps> = ({
  position,
  messages,
}) => {
  return (
    <div className={clsx('messages-table', `messages-table--${position}`)}>
      <div className="messages-table__avatar">
        <Avatar
          path="http://chatvia-light.react.themesbrand.com/static/media/avatar-2.feb0f89de58f0ef9b424.jpg"
          imgWidth={35}
          username="A"
          className="custom-avatar"
        />
      </div>
      <div className="messages-table__body">
        <div className="bubble">
          <MessagesContent messages={messages} position={position} />
        </div>
        <Title level={5} className="username">
          Danh Huy
        </Title>
      </div>
    </div>
  );
};

export default MessagesTable;
