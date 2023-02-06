import React from 'react';
import { ClockCircleOutlined, MoreOutlined } from '@ant-design/icons';
import Dropdown from '@common/Dropdown/Dropdown';
import clsx from 'clsx';
import ChatBubbleMenu from '@modules/ChatBubbleMenu/ChatBubbleMenu';
import { useTranslation } from 'react-i18next';

import './MessagesContent.scss';

interface IMessagesContent {
  position: string;
  message?: string;
  time?: string;
  typing?: boolean;
}

const MessagesContent: React.FC<IMessagesContent> = ({
  position,
  message,
  time,
  typing,
}) => {
  const getTime = (stringTime: string) => {
    const date = new Date(stringTime);
    let minutes = String(date.getMinutes());
    if (minutes.length == 1) minutes = '0' + minutes;
    return `${date.getHours()}:${minutes}`;
  };
  const { t } = useTranslation('dashboard', { keyPrefix: 'sidebar.chats' });
  return (
    <>
      {typing ? (
        <div className="messages">
          <div className={clsx('bubble-chat', `bubble-chat--${position}`)}>
            <div
              className={clsx(
                'bubble-chat__content',
                `bubble-chat__content--${position}`
              )}
            >
              <p className="message typing">
                {t('typing')}
                <span className="animate-typing">
                  <span className="dot ms-1"></span>
                  <span className="dot ms-1"></span>
                  <span className="dot ms-1"></span>
                </span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="messages">
          <div className={clsx('bubble-chat', `bubble-chat--${position}`)}>
            <div
              className={clsx(
                'bubble-chat__content',
                `bubble-chat__content--${position}`
              )}
            >
              {message}
              <div className="chat-time">
                <ClockCircleOutlined className="custom-icon-time" />
                {time && getTime(time)}
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
      )}
    </>
  );
};

export default MessagesContent;
