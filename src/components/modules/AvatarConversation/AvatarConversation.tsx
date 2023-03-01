import * as React from 'react';
import Avatar from '@common/Avatar/Avatar';
import Title from '@common/Title/Title';
import { useAppSelector } from 'src/store/hooks';
import { selectFriend, selectUserProfile } from 'src/store/userSlice';
import getMemberConversation from 'src/utils/getMemberConversation';
import getGroupTitle from 'src/utils/getGroupTitle';
import AvatarGroupChat from '@modules/AvatarGroupChat/AvatarGroupChat';
import { selectConversation } from 'src/store/conversationSlice';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import './AvatarConversation.scss';
import { selectCaller } from 'src/store/callSlice';
interface IAvatarConversation {
  handleOpenDetail?: () => void;
  imgSize: number;
  titleCall?: string;
}
const AvatarConversation: React.FC<IAvatarConversation> = ({
  handleOpenDetail,
  imgSize,
  titleCall,
}) => {
  const { t } = useTranslation('dashboard', {
    keyPrefix: 'chat-ui.chat-header.chat-call',
  });
  const { selectedFriend } = useAppSelector(selectFriend);
  const { selectedConversation } = useAppSelector(selectConversation);
  const userProfileStore = useAppSelector(selectUserProfile);
  const nameFriend = selectedFriend?.fullName ?? selectedFriend?.username;
  const nameMember =
    getMemberConversation(selectedConversation, userProfileStore)?.fullName ??
    getMemberConversation(selectedConversation, userProfileStore)?.username;
  const nameUser = nameFriend ?? nameMember;
  const { caller } = useAppSelector(selectCaller);
  const callerName = caller?.fullName || caller?.username;

  return (
    <>
      {selectedConversation?.isGroup ? (
        <>
          <AvatarGroupChat conversation={selectedConversation} imgWidth={26} />
          <Title
            level={5}
            className={clsx(
              'chat-header__username',
              titleCall && 'titlecall__username'
            )}
            onClick={handleOpenDetail}
          >
            {selectedConversation.title ||
              getGroupTitle(selectedConversation, userProfileStore)}
          </Title>
          {titleCall && <Title className="titlecall">{titleCall}</Title>}
        </>
      ) : (
        <>
          <Avatar
            path={
              caller?.avatar ||
              getMemberConversation(selectedConversation, userProfileStore)
                ?.avatar ||
              selectedFriend?.avatar
            }
            imgWidth={imgSize}
            username={
              callerName?.charAt(0).toUpperCase() ||
              nameUser?.charAt(0).toUpperCase()
            }
            className="custom-avatar"
          />
          <Title
            level={5}
            className="chat-header__username"
            onClick={handleOpenDetail}
          >
            {callerName || selectedConversation?.title || nameUser}
          </Title>
          {titleCall && (
            <Title className="titlecall">
              {titleCall === 'Audio'
                ? t('start-voice-call')
                : t('start-video-call')}
            </Title>
          )}
        </>
      )}
    </>
  );
};

export default AvatarConversation;
