import { IBase } from './base';
import { EUserRole, IGetUsersQuery, TUserProfile } from './user';

export type TConversationQuery = Omit<IGetUsersQuery, 'status'>;

export interface IParticipant extends IBase {
  role: EUserRole.MEMBER;
  user: TUserProfile;
}

export interface IConversation extends IBase {
  title: string;
  isGroup: boolean;
  participants: IParticipant[];
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
