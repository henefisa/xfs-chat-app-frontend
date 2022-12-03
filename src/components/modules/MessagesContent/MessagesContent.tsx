import React from 'react';
import { ClockCircleOutlined, MoreOutlined } from '@ant-design/icons';
import Dropdown from '@common/Dropdown/Dropdown';
import clsx from 'clsx';
import ChatBubbleMenu from '../ChatBubbleMenu/ChatBubbleMenu';
import getTime from 'src/utils/getTime';

import './MessagesContent.scss';

interface IMessagesContent {
  position: string;
  messages: string;
  time: string;
}

const MessagesContent: React.FC<IMessagesContent> = ({
  position,
  messages,
  time,
}) => {
  return (
    <div className="messages">
      <div className={clsx('bubble-chat', `bubble-chat--${position}`)}>
        <div
          className={clsx(
            'bubble-chat__content',
            `bubble-chat__content--${position}`
          )}
        >
          {messages}
          <div className="chat-time">
            <ClockCircleOutlined className="custom-icon-time" />
            {getTime(time)}
          </div>
        </div>
        <div className="bubble-chat__actions">
          <Dropdown
            overlay={<ChatBubbleMenu position={position} />}
            trigger={['click']}
            placement="bottom"
            className={clsx('dropdown-chat', `dropdown-chat--${position}`)}
          >
            <MoreOutlined className="custom-icon-actions" />
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default MessagesContent;
