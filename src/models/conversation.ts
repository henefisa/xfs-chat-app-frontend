import { IBase } from './base';
import { IGetUsersQuery, EUser, EUserRole } from './user';

export type TConversationQuery = Omit<IGetUsersQuery, 'status'>;

export interface IConversation extends IBase {
  title: string;
  participants: IParticipant[];
  isGroup: boolean;
}
export interface IParticipant extends IBase {
  role: string;
  user: {
    id: string;
    username: string;
    email: string;
    fullName: null | string;
    avatar: null | string;
    phone: null | string;
    description: null | string;
    location: null | string;
    status: EUser.STATUS_ACTIVE | EUser.STATUS_DEACTIVE | EUser.STATUS_INACTIVE;
    role: EUserRole.USER | EUserRole.ADMIN;
  };
}
