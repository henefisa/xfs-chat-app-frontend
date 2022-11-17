import EFriendStatus from 'src/interfaces/EFriendStatus';
import EUser from 'src/interfaces/EUser';
import { IBase } from './base';

export interface IUser extends IBase {
  username: string;
}

export interface IFriendStatusState extends IUser {
  status: EFriendStatus.REQUESTED | EFriendStatus.ACCEPTED;
  owner: {
    id: string;
  };
  userTarget: {
    id: string;
  };
}

export interface IUserItemResult extends IUser {
  email: string;
  fullName: null | string;
  avatar: null | string;
  phone: null | string;
  description: null | string;
  location: null | string;
  status: EUser.STATUS_ACTIVE;
  role: EUser.ROLE_USER | EUser.ROLE_ADMIN;
  friendStatus: null | IFriendStatusState;
}
