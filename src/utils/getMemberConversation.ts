import { IConversation, TUserProfile } from 'src/models';

const getMemberConversation = (
  conversation: IConversation | null,
  userProfileStore: TUserProfile | null
) => {
  if (!userProfileStore || !conversation) return;
  if (userProfileStore.id !== conversation.participants?.[0].user.id)
    return conversation.participants?.[0].user;

  return conversation.participants[1].user;
};
export default getMemberConversation;
