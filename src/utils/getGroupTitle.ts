import { IConversation, TUserProfile } from 'src/models';

const getGroupTitle = (
  conversation: IConversation,
  userProfileStore: TUserProfile | null
) => {
  if (!userProfileStore) return '';

  const newParticipants = conversation.participants.filter(
    (item) => item.user.id !== userProfileStore.id
  );

  const titleConversation: string = newParticipants
    .map((item) =>
      item.user.fullName ? item.user.fullName : item.user.username
    )
    .join(', ');
  if (titleConversation.length > 25)
    return titleConversation.substring(0, 25) + '...';
  return titleConversation;
};

export default getGroupTitle;
