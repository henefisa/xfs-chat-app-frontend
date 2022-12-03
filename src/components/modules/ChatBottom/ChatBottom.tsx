import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
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
import { SocketContext } from 'src/context/socket/context';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import {
  selectConversation,
  selectUserProfile,
  updateListMessage,
} from 'src/store/userSlice';

import './ChatBottom.scss';

interface IChatBottom {
  setMessagesUser: React.Dispatch<React.SetStateAction<string[]>>;
}

const ChatBottom: React.FC<IChatBottom> = ({ setMessagesUser }) => {
  const socket = React.useContext(SocketContext);
  const dispatch = useAppDispatch();
  const { selectedConversation } = useAppSelector(selectConversation);
  const userProfileStore = useAppSelector(selectUserProfile);
  const { t } = useTranslation('dashboard', {
    keyPrefix: 'chat-ui.chat-bottom',
  });
  const inputFileRef = React.createRef<HTMLInputElement>();
  const inputImgRef = React.createRef<HTMLInputElement>();
  const [messages, setMessages] = useState('');

  const toggleFile = () => {
    inputFileRef.current?.click();
  };
  const toggleImg = () => {
    inputImgRef.current?.click();
  };
  const onEmojiClick = (emojiObject: EmojiClickData) => {
    setMessages((prev: string) => prev + emojiObject.emoji);
  };

  const handleSendMessage = () => {
    if (!userProfileStore || !selectedConversation || !messages) return;

    socket.emit(
      'SEND_MESSAGE',
      {
        userId: userProfileStore.id,
        conversationId: selectedConversation.id,
        text: messages,
      },
      () => {
        // do something
      }
    );

    dispatch(
      updateListMessage({
        id: uuidv4(),
        updatedAt: new Date().toString(),
        createdAt: new Date().toString(),
        attachment: null,
        isPin: false,
        isTick: false,
        message: messages,
        sender: userProfileStore,
      })
    );

    setMessagesUser((prev: string[]) => [...prev, messages]);
    setMessages('');
  };

  return (
    <div className="chat-bottom">
      <div className="type-chat">
        <Input
          className="type-chat__input"
          placeholder={t('enter-message')}
          onChange={(e) => setMessages(e.target.value)}
          value={messages}
          onPressEnter={handleSendMessage}
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
          <Button className="send-chat__btn" onClick={handleSendMessage}>
            <SendOutlined className="custom-send-chat" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBottom;
