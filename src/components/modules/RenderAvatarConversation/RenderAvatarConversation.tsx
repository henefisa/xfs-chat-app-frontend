import * as React from 'react';
import Avatar from '@common/Avatar/Avatar';
import Title from '@common/Title/Title';
import { useAppSelector } from 'src/store/hooks';
import { selectFriend, selectUserProfile } from 'src/store/userSlice';
import getMemberConversation from 'src/utils/getMemberConversation';
import getGroupTitle from 'src/utils/getGroupTitle';
import AvatarGroupChat from '@modules/AvatarGroupChat/AvatarGroupChat';
import { selectConversation } from 'src/store/conversationSlice';

import './RenderAvatarConversation.scss';
interface IRenderAvatarConversation {
  handleOpenDetail?: () => void;
  imgSize: number;
}
const RenderAvatarConversation: React.FC<IRenderAvatarConversation> = ({
  handleOpenDetail,
  imgSize,
}) => {
  const { selectedFriend } = useAppSelector(selectFriend);
  const { selectedConversation } = useAppSelector(selectConversation);
  const userProfileStore = useAppSelector(selectUserProfile);
  const nameFriend = selectedFriend?.fullName ?? selectedFriend?.username;
  const nameMember =
    getMemberConversation(selectedConversation, userProfileStore)?.fullName ??
    getMemberConversation(selectedConversation, userProfileStore)?.username;
  const nameUser = nameFriend ?? nameMember;
  return (
    <>
      {selectedConversation?.isGroup ? (
        <>
          <AvatarGroupChat conversation={selectedConversation} imgWidth={26} />
          <Title
            level={5}
            className="chat-header__username"
            onClick={handleOpenDetail}
          >
            {selectedConversation.title ||
              getGroupTitle(selectedConversation, userProfileStore)}
          </Title>
        </>
      ) : (
        <>
          <Avatar
            path={
              getMemberConversation(selectedConversation, userProfileStore)
                ?.avatar || selectedFriend?.avatar
            }
            imgWidth={imgSize}
            username={nameUser?.charAt(0).toUpperCase()}
            className="custom-avatar"
          />
          <Title
            level={5}
            className="chat-header__username"
            onClick={handleOpenDetail}
          >
            {selectedConversation?.title || nameUser}
          </Title>
        </>
      )}
    </>
  );
};

export default RenderAvatarConversation;