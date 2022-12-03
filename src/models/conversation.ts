import { IBase } from './base';
import { IGetUsersQuery, TUserProfile, EUserRole } from './user';

export type TConversationQuery = Omit<IGetUsersQuery, 'status'>;

export interface IConversation extends IBase {
  title: string;
  participants: IParticipant[];
  isGroup: boolean;
}

export interface IParticipant extends IBase {
  role: EUserRole.MEMBER;
  user: TUserProfile;
}

export interface IMessageQuery {
  id: string;
  q?: string;
  limit?: string;
  offset?: string;
}

export interface IMessages extends IBase {
  attachment: string | null;
  isPin: boolean;
  isTick: boolean;
  message: string;
  sender: TUserProfile;
}
