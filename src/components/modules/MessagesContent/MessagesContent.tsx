import React from 'react';
import { ClockCircleOutlined, MoreOutlined } from '@ant-design/icons';
import Dropdown from '@common/Dropdown/Dropdown';
import clsx from 'clsx';
import ChatBubbleMenu from '../ChatBubbleMenu/ChatBubbleMenu';
import './MessagesContent.scss';

interface IMessagesContent {
  position: string;
  messages: string;
}

const MessagesContent: React.FC<IMessagesContent> = ({
  position,
  messages,
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
          <div className="time">
            <ClockCircleOutlined className="custom-icon-time" />
            10:30
          </div>
        </div>
        <div className="bubble-chat__actions">
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
            <MoreOutlined className="custom-icon-actions" />
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default MessagesContent;
