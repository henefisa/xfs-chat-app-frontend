import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  PaperClipOutlined,
  PictureOutlined,
  SendOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import Button from '@common/Button/Button';
import Dropdown from '@common/Dropdown/Dropdown';
import Input from '@common/Input/Input';
import Tooltip from '@common/Tooltip/Tooltip';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { useTranslation } from 'react-i18next';
import { SocketContext } from 'src/context/socket/context';
import { ESocketEvent } from 'src/models/socket';
import {
  createConversation,
  getConversation,
} from 'src/services/conversationService';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { selectFriend, selectUserProfile } from 'src/store/userSlice';
import {
  selectConversation,
  updateListConversation,
  updateListMessage,
  updateConversationSelected,
} from 'src/store/conversationSlice';
import './ChatBottom.scss';
import { IConversation } from 'src/models';
interface IChatBottom {}

const ChatBottom: React.FC<IChatBottom> = () => {
  const socket = React.useContext(SocketContext);
  const dispatch = useAppDispatch();

  const { t: t1 } = useTranslation('common');
  const { t } = useTranslation('dashboard', {
    keyPrefix: 'chat-ui.chat-bottom',
  });

  const inputFileRef = React.createRef<HTMLInputElement>();
  const inputImgRef = React.createRef<HTMLInputElement>();
  const [messages, setMessages] = useState('');

  const { selectedConversation } = useAppSelector(selectConversation);

  const { selectedFriend } = useAppSelector(selectFriend);
  const userProfileStore = useAppSelector(selectUserProfile);

  const toggleFile = () => {
    inputFileRef.current?.click();
  };
  const toggleImg = () => {
    inputImgRef.current?.click();
  };
  const onEmojiClick = (emojiObject: EmojiClickData) => {
    setMessages((prev: string) => prev + emojiObject.emoji);
  };

  const handleSendMessage = async () => {
    if (!userProfileStore || !messages.trim()) return;

    if (selectedConversation) {
      socket.emit(ESocketEvent.SEND_MESSAGE, {
        userId: userProfileStore.id,
        conversationId: selectedConversation.id,
        text: messages,
      });
    } else {
      let newConversationId = '';
      if (!selectedFriend?.conversation && selectedFriend) {
        try {
          const newConversation = [userProfileStore.id, selectedFriend.id];
          const result: IConversation = await createConversation(
            {
              members: newConversation,
            },
            t1
          );

          const res = await getConversation(t);
          dispatch(updateListConversation(res.conversations));
          dispatch(updateConversationSelected(result));
          newConversationId = result.id;
        } catch (err) {
          // do something
        }
      }

      socket.emit(ESocketEvent.SEND_MESSAGE, {
        userId: userProfileStore.id,
        conversationId: newConversationId || selectedFriend?.conversation?.id,
        text: messages,
      });
    }

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
        conversation: null,
      })
    );

    setMessages('');
  };

  const onSendMessage = React.useCallback(() => {
    return () => handleSendMessage();
  }, [messages]);

  return (
    <div className="chat-bottom">
      <div className="type-chat">
        <Input
          className="type-chat__input"
          placeholder={t('enter-message')}
          onChange={(e) => setMessages(e.target.value)}
          value={messages}
          onPressEnter={onSendMessage()}
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
          <Button className="send-chat__btn" onClick={onSendMessage()}>
            <SendOutlined className="custom-send-chat" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBottom;
