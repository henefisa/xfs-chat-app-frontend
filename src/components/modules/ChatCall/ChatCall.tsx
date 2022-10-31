import React from 'react';
import { CloseOutlined, PhoneOutlined } from '@ant-design/icons';

import Avatar from '@common/Avatar/Avatar';
import Title from '@common/Title/Title';
import Button from '@common/Button/Button';

import './ChatCall.scss';

interface IChatCallProps {
  onClose(): void;
  title: string;
}

const ChatCall: React.FC<IChatCallProps> = ({ onClose, title }) => {
  return (
    <div className="chat-call">
      <div className="modal__overlay"></div>
      <div className="modal__body">
        <div className="items">
          <Avatar
            path="https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-6/277551484_1607305416300980_1426726336589949572_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=NDE6kmkwFQ8AX9-U3bh&_nc_ht=scontent.fdad3-1.fna&oh=00_AT8SGcvhT_y6-Lc16cMBv0OwsUOg0x7ef7Yp1yb_1teoEQ&oe=635BDBD2"
            imgWidth={96}
            username="A"
            className="custom-avatar"
          />
          <Title level={5} className="title-username">
            Danh Huy
          </Title>
          <div className="modal-body-item__title">
            <Title level={5} className="title-action">
              Start {title} Call
            </Title>
          </div>
        </div>
        <div className="actions">
          <div className="btn--close">
            <Button className="custom-btn--close" onClick={onClose}>
              <CloseOutlined className="custom-icon" />
            </Button>
          </div>
          <div className="btn--suscess">
            <Button className="custom-btn--suscess">
              <PhoneOutlined className="custom-icon" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatCall;
