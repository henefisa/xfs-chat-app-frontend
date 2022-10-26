import React from 'react'
import {
  SmileOutlined,
  PaperClipOutlined,
  PictureOutlined,
  SendOutlined,
} from '@ant-design/icons';

import Button from '@common/Button/Button';
import Input from '@common/Input/Input';

import './ChatBottom.scss';



const ChatBottom = () => {
  return (
    <div className="bottom-chat">
      <div className="bottom-chat__type-chat">
        <Input
          className="type-chat__input"
          placeholder="Enter Message..."
        />
      </div>
      <div className="bottom-chat__items-chat">
        <div className="items-chat__emoji-btn">
          <Button className="emoji-btn__button button--send">
            <SmileOutlined className="custom-send-icon" />
          </Button>
        </div>
        <div className="items-chat__attached-file-btn">
          <Button className="attached-file-btn__button button--send">
            <PaperClipOutlined className="custom-send-icon" />
          </Button>
        </div>
        <div className="items-chat__images-btn">
          <Button className="images-btn__button button--send">
            <PictureOutlined className="custom-send-icon" />
          </Button>
        </div>
        <div className="items-chat__send-chat">
          <Button className="send-chat__button button-send-chat">
            <SendOutlined className="custom-send-chat" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ChatBottom;