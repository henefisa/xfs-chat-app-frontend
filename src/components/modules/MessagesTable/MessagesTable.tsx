import React from 'react';

import { ClockCircleOutlined, MoreOutlined } from '@ant-design/icons';

import Avatar from '@common/Avatar/Avatar';
import Title from '@common/Title/Title';
import Dropdown from '@common/Dropdown/Dropdown';

import ChatBubbleMenu from '../ChatBubbleMenu/ChatBubbleMenu';

import './MessagesTable.scss';
import clsx from 'clsx';

interface IMessagesTableProps {
  position: string;
}

const MessagesTable: React.FC<IMessagesTableProps> = ({ position }) => {
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
      <div className="messages-table__chat-content">
        <div
          className={clsx(
            'messages-table__chat-content-user',
            `messages-table__chat-content-user--${position}`
          )}
        >
          <div
            className={clsx(
              'messages-table__chat-content-bubble',
              `messages-table__chat-content-bubble--${position}`
            )}
          >
            hi...Good Morning!
            <div className="messages-table__chat-content-bubble-time">
              <ClockCircleOutlined className="custom-icon-chat-time" />
              10:30
            </div>
          </div>
          <div className="chat-content-bubble-more">
            <Dropdown
              overlay={
                <ChatBubbleMenu
                  position={position === 'left' ? 'left' : 'right'}
                />
              }
              trigger={['click']}
              placement="bottom"
              className={clsx(
                'dropdown-chat-menu',
                `dropdown-chat-menu--${position}`
              )}
            >
              <MoreOutlined className="custom-icon-chat-bubble-more" />
            </Dropdown>
          </div>
        </div>
        <Title level={5} className="chat-content__username">
          Danh Huy
        </Title>
      </div>
    </div>
  );
};

export default MessagesTable;
