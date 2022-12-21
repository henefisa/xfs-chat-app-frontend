import { IConversation, TUserProfile } from 'src/models';

const getGroupTitle = (
  conversation: IConversation,
  userProfileStore: TUserProfile | null
) => {
  if (!userProfileStore) return '';
  if (!conversation.participants) return '';
  const newParticipants = conversation.participants.filter(
    (item) => item.user.id !== userProfileStore.id
  );

  const titleConversation: string = newParticipants
    .map((item) =>
      item.user.fullName ? item.user.fullName : item.user.username
    )
    .join(', ');
  return titleConversation;
};

export default getGroupTitle;
