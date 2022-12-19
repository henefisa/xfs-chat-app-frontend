import React from 'react';
import Avatar from '@common/Avatar/Avatar';
import Title from '@common/Title/Title';
import MessagesContent from '@modules/MessagesContent/MessagesContent';
import clsx from 'clsx';
import { TUserProfile } from 'src/models';

import './MessagesTable.scss';

interface IMessagesTableProps {
  position: string;
  messages: string;
  time: string;
  sender: TUserProfile | null;
}

const MessagesTable: React.FC<IMessagesTableProps> = ({
  position,
  messages,
  time,
  sender,
}) => {
  const name = sender?.fullName ?? sender?.username;
  return (
    <div className={clsx('messages-table', `messages-table--${position}`)}>
      <div className="messages-table__avatar">
        <Avatar
          path={sender?.avatar}
          imgWidth={35}
          username={name?.charAt(0).toUpperCase()}
          className="custom-avatar"
        />
      </div>
      <div className="messages-table__body">
        <div className="bubble">
          <MessagesContent
            messages={messages}
            position={position}
            time={time}
          />
        </div>
        <Title level={5} className="username">
          {name}
        </Title>
      </div>
    </div>
  );
};

export default MessagesTable;
