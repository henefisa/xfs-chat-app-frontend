import React, { useState } from 'react';

import {
  SmileOutlined,
  PaperClipOutlined,
  PictureOutlined,
  SendOutlined,
} from '@ant-design/icons';
import Button from '@common/Button/Button';
import Input from '@common/Input/Input';
import Emoji from 'emoji-picker-react';

import './ChatBottom.scss';

const ChatBottom: React.FC = () => {
  const [emoji, setEmoji] = useState(false);
  const inputFileRef = React.createRef<HTMLInputElement>();
  const inputImgRef = React.createRef<HTMLInputElement>();

  const toggleFile = () => {
    inputFileRef.current?.click();
  };
  const toggleImg = () => {
    inputImgRef.current?.click();
  };

  return (
    <div className="chat-bottom">
      <div className="type-chat">
        <Input className="type-chat__input" placeholder="Enter Message..." />
      </div>
      <div className="chat-actions">
        <div className="choose-emoji">
          <Button
            className="choose-emoji__btn"
            onClick={() => setEmoji(!emoji)}
          >
            <SmileOutlined className="custom-send-icon" />
          </Button>
          {emoji && <Emoji height={338} width={282} />}
        </div>
        <div className="attached-file">
          <input type="file" ref={inputFileRef} hidden />
          <Button className="attached-file__btn" onClick={toggleFile}>
            <PaperClipOutlined className="custom-send-icon" />
          </Button>
        </div>
        <div className="attached-images">
          <input type="file" ref={inputImgRef} hidden accept="image/*" />
          <Button className="attached-images__btn" onClick={toggleImg}>
            <PictureOutlined className="custom-send-icon" />
          </Button>
        </div>
        <div className="send-chat">
          <Button className="send-chat__btn">
            <SendOutlined className="custom-send-chat" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBottom;
