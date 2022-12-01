import React from 'react';
import Avatar from '@common/Avatar/Avatar';
import Title from '@common/Title/Title';
import MessagesContent from '../MessagesContent/MessagesContent';
import clsx from 'clsx';
import { TUserProfile } from 'src/models';

import './MessagesTable.scss';

interface IMessagesTableProps {
  position: string;
  messages: string;
  time: string;
  sender: TUserProfile;
}

const MessagesTable: React.FC<IMessagesTableProps> = ({
  position,
  messages,
  time,
  sender,
}) => {
  return (
    <div className={clsx('messages-table', `messages-table--${position}`)}>
      <div className="messages-table__avatar">
        <Avatar
          path={sender.avatar}
          imgWidth={26}
          username={
            sender.fullName?.charAt(0).toUpperCase() ??
            sender.username?.charAt(0).toUpperCase()
          }
          className="custom-avatar"
        />
      </div>
      <div className="messages-table__body">
        <div className="bubble">
          <MessagesContent
            messages={messages}
            time={time}
            position={position}
          />
        </div>
        <Title level={5} className="username">
          {sender.fullName ?? sender.username}
        </Title>
      </div>
    </div>
  );
};

export default MessagesTable;
