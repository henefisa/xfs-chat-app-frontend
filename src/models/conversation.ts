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
