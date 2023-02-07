import { IBase } from './base';
import { EUserRole, IGetUsersQuery, TUserProfile } from './user';

export type TConversationQuery = Omit<IGetUsersQuery, 'status'>;

export interface IParticipant extends IBase {
  role: EUserRole.MEMBER;
  user: TUserProfile;
}

export interface IConversation extends IBase {
  title: string | null;
  isGroup: boolean;
  avatar: string | null;
  participants?: IParticipant[] | null;
}

export interface IDataCreateConversation {
  title?: string;
  members: string[];
}

export interface IMessageQuery {
  id: string;
  q?: string;
  limit?: string;
  offset?: string;
}

export interface IMessage extends IBase {
  attachment: string | null;
  isPin: boolean;
  isTick: boolean;
  message: string;
  sender: TUserProfile;
  isLastOne: boolean;
  conversation: string | null;
}
