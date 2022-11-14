import React from 'react';
import Avatar from '@common/Avatar/Avatar';
import Title from '@common/Title/Title';
import MessagesContent from '../MessagesContent/MessagesContent';
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
          path="https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-6/277551484_1607305416300980_1426726336589949572_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=NDE6kmkwFQ8AX9-U3bh&_nc_ht=scontent.fdad3-1.fna&oh=00_AT8SGcvhT_y6-Lc16cMBv0OwsUOg0x7ef7Yp1yb_1teoEQ&oe=635BDBD2"
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
