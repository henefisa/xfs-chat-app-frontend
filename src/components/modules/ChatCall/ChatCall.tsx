import React from 'react';
import { CloseOutlined, PhoneOutlined } from '@ant-design/icons';

import Avatar from '@common/Avatar/Avatar';
import Title from '@common/Title/Title';
import Button from '@common/Button/Button';
import Modal from '@common/Modal/Modal';
import { useTranslation } from 'react-i18next';
import { selectFriend, selectConversation } from 'src/store/userSlice';
import { useAppSelector } from 'src/store/hooks';

import './ChatCall.scss';

interface IChatCallProps {
  onClose(): void;
  title: string;
  isOpen: boolean;
}

const ChatCall: React.FC<IChatCallProps> = ({ onClose, title, isOpen }) => {
  const { t } = useTranslation('dashboard', {
    keyPrefix: 'chat-ui.chat-header.chat-call',
  });
  const { selectedFriend } = useAppSelector(selectFriend);
  const { selectedConversation } = useAppSelector(selectConversation);

  return (
    <Modal transitionName="none" maskTransitionName="none" open={isOpen}>
      <div className="modal-body">
        <div className="modal-body__items">
          <Avatar
            path={selectedFriend?.owner?.avatar}
            imgWidth={96}
            username={
              selectedConversation?.title ||
              selectedFriend?.owner?.fullName?.charAt(0).toUpperCase() ||
              selectedFriend?.owner?.username.charAt(0).toUpperCase()
            }
            className="custom-avatar"
          />
          <Title level={5} className="username">
            {selectedConversation?.title ||
              selectedFriend?.owner?.fullName ||
              selectedFriend?.owner?.username}
          </Title>
          <Title level={5} className="title-action">
            {title === 'Audio' ? t('start-voice-call') : t('start-video-call')}
          </Title>
        </div>
        <div className="actions">
          <Button
            className="actions__btn actions__btn--close"
            onClick={onClose}
          >
            <CloseOutlined className="custom-icon" />
          </Button>
          <Button className="actions__btn actions__btn--success">
            <PhoneOutlined className="custom-icon" />
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ChatCall;
