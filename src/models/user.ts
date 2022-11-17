import { IBase } from './base';

export interface IUser extends IBase {
  username: string;
}

export enum EFriendStatus {
  REQUESTED = 'REQUESTED',
  ACCEPTED = 'ACCEPTED',
}

export enum EUserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum EUser {
  STATUS_ACTIVE = 'ACTIVE',
  STATUS_DEACTIVE = 'DEACTIVE',
  STATUS_INACTIVE = 'INACTIVE',
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
  status: EUser.STATUS_ACTIVE | EUser.STATUS_DEACTIVE | EUser.STATUS_INACTIVE;
  role: EUserRole.USER | EUserRole.ADMIN;
  friendStatus: null | IFriendStatusState;
}

export type TUserProfile = Omit<IUserItemResult, 'friendStatus'>;
