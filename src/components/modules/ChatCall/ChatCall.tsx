import React from 'react';
import { CloseOutlined, PhoneOutlined } from '@ant-design/icons';

import Avatar from '@common/Avatar/Avatar';
import Title from '@common/Title/Title';
import Button from '@common/Button/Button';
import Modal from '@common/Modal/Modal';
import { useTranslation } from 'react-i18next';

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

  return (
    <Modal transitionName="none" maskTransitionName="none" open={isOpen}>
      <div className="modal-body">
        <div className="modal-body__items">
          <Avatar
            path="http://chatvia-light.react.themesbrand.com/static/media/avatar-2.feb0f89de58f0ef9b424.jpg"
            imgWidth={96}
            username="A"
            className="custom-avatar"
          />
          <Title level={5} className="username">
            Danh Huy
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
