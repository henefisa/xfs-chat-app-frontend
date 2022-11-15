import React, { useState } from 'react';

import {
  SmileOutlined,
  PaperClipOutlined,
  PictureOutlined,
  SendOutlined,
} from '@ant-design/icons';
import Button from '@common/Button/Button';
import Input from '@common/Input/Input';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import Tooltip from '@common/Tooltip/Tooltip';
import { useTranslation } from 'react-i18next';
import Dropdown from '@common/Dropdown/Dropdown';

import './ChatBottom.scss';

interface IChatBottom {
  setMessagesUser: React.Dispatch<React.SetStateAction<string[]>>;
}

const ChatBottom: React.FC<IChatBottom> = ({ setMessagesUser }) => {
  const { t } = useTranslation('dashboard', {
    keyPrefix: 'chat-ui.chat-bottom',
  });
  const inputFileRef = React.createRef<HTMLInputElement>();
  const inputImgRef = React.createRef<HTMLInputElement>();
  const [messages, setMessages] = useState('');

  const handleClick = () => {
    setMessagesUser((prev: string[]) => [...prev, messages]);
    setMessages('');
  };
  const toggleFile = () => {
    inputFileRef.current?.click();
  };
  const toggleImg = () => {
    inputImgRef.current?.click();
  };
  const onEmojiClick = (emojiObject: EmojiClickData) => {
    setMessages((prev: string) => prev + emojiObject.emoji);
  };

  return (
    <div className="chat-bottom">
      <div className="type-chat">
        <Input
          className="type-chat__input"
          placeholder={t('enter-message')}
          onChange={(e) => setMessages(e.target.value)}
          value={messages}
          onPressEnter={handleClick}
        />
      </div>
      <div className="chat-actions">
        <div className="choose-emoji">
          <Dropdown
            overlay={
              <EmojiPicker
                height={338}
                width={282}
                onEmojiClick={onEmojiClick}
              />
            }
            trigger={['click']}
            placement="topLeft"
            autoFocus={true}
          >
            <Tooltip tooltipTitle={t('emoji')}>
              <SmileOutlined className="custom-send-icon" />
            </Tooltip>
          </Dropdown>
        </div>
        <div className="attached-file">
          <input type="file" ref={inputFileRef} hidden />
          <Button
            className="attached-file__btn general-btn"
            onClick={toggleFile}
          >
            <Tooltip tooltipTitle={t('attached-file')}>
              <PaperClipOutlined className="custom-send-icon" />
            </Tooltip>
          </Button>
        </div>
        <div className="attached-images">
          <input type="file" ref={inputImgRef} hidden accept="image/*" />
          <Button
            className="attached-images__btn general-btn"
            onClick={toggleImg}
          >
            <Tooltip tooltipTitle={t('attached-image')}>
              <PictureOutlined className="custom-send-icon" />
            </Tooltip>
          </Button>
        </div>
        <div className="send-chat">
          <Button className="send-chat__btn" onClick={handleClick}>
            <SendOutlined className="custom-send-chat" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBottom;
