import React from 'react';
import { CloseOutlined, PhoneOutlined } from '@ant-design/icons';
import Button from '@common/Button/Button';
import Modal from '@common/Modal/Modal';
import AvatarConversation from 'src/components/modules/AvatarConversation/AvatarConversation';
import './ChatCall.scss';

interface IChatCallProps {
  onClose(): void;
  title: string;
  isOpen: boolean;
}

const ChatCall: React.FC<IChatCallProps> = ({ onClose, title, isOpen }) => {
  return (
    <Modal transitionName="none" maskTransitionName="none" open={isOpen}>
      <div className="modal-body">
        <div className="modal-body__items">
          <AvatarConversation imgSize={96} titleCall={title} />
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
