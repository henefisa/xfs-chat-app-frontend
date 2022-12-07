import React from 'react';
import { CloseOutlined, PhoneOutlined } from '@ant-design/icons';

import Avatar from '@common/Avatar/Avatar';
import Title from '@common/Title/Title';
import Button from '@common/Button/Button';
import Modal from '@common/Modal/Modal';
import { useTranslation } from 'react-i18next';
import {
  selectFriend,
  selectConversation,
  selectUserProfile,
} from 'src/store/userSlice';
import { useAppSelector } from 'src/store/hooks';
import getMemberConversation from 'src/utils/getMemberConversation';
import AvatarGroupChat from '../AvatarGroupChat/AvatarGroupChat';
import getGroupTitle from 'src/utils/getGroupTitle';

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
  const [hasConversation, setHasConversation] = React.useState<boolean>(false);
  const { selectedConversation } = useAppSelector(selectConversation);
  const userProfileStore = useAppSelector(selectUserProfile);
  const name = selectedFriend?.fullName ?? selectedFriend?.username;
  const nameMember =
    getMemberConversation(selectedConversation, userProfileStore)?.fullName ??
    getMemberConversation(selectedConversation, userProfileStore)?.username ??
    selectedFriend?.fullName ??
    selectedFriend?.username;
  React.useEffect(() => {
    selectedConversation ? setHasConversation(true) : setHasConversation(false);
  }, [selectedConversation]);
  return (
    <Modal transitionName="none" maskTransitionName="none" open={isOpen}>
      <div className="modal-body">
        <div className="modal-body__items">
          {hasConversation ? (
            <>
              {selectedConversation?.isGroup ? (
                <>
                  <AvatarGroupChat
                    conversation={selectedConversation}
                    imgWidth={26}
                  />
                  <Title level={5} className="username-group">
                    {selectedConversation.title ||
                      getGroupTitle(selectedConversation, userProfileStore)}
                  </Title>
                </>
              ) : (
                <>
                  <Avatar
                    path={
                      getMemberConversation(
                        selectedConversation,
                        userProfileStore
                      )?.avatar
                    }
                    imgWidth={96}
                    username={nameMember?.charAt(0).toUpperCase()}
                    className="custom-avatar"
                  />
                  <Title level={5} className="username">
                    {selectedConversation?.title || nameMember}
                  </Title>
                </>
              )}
            </>
          ) : (
            <>
              <Avatar
                path={selectedFriend?.avatar}
                imgWidth={96}
                username={name?.charAt(0).toUpperCase()}
                className="custom-avatar"
              />
              <Title level={5} className="username">
                {name}
              </Title>
            </>
          )}
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
