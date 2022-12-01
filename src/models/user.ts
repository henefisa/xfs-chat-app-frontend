import { IBase } from './base';

export interface IUser extends IBase {
  username: string;
}

export enum EFriendStatus {
  REQUESTED = 'REQUESTED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export enum EUserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
}

export enum EUser {
  STATUS_ACTIVE = 'ACTIVE',
  STATUS_DEACTIVE = 'DEACTIVE',
  STATUS_INACTIVE = 'INACTIVE',
  STATUS_ONLINE = 'ONLINE',
  STATUS_OFFLINE = 'OFFLINE',
}

export interface IFriendStatusState extends IBase {
  status:
    | EFriendStatus.REQUESTED
    | EFriendStatus.ACCEPTED
    | EFriendStatus.REJECTED;
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
  activeStatus: EUser.STATUS_OFFLINE | EUser.STATUS_ONLINE;
  role: EUserRole.USER | EUserRole.ADMIN;
  friendStatus: null | IFriendStatusState;
}

export type TUserProfile = Omit<IUserItemResult, 'friendStatus'>;

export type TUserInfo = Omit<
  TUserProfile,
  'id' | 'createdAt' | 'updatedAt' | 'status' | 'role' | 'username'
>;

export interface IListFriendRequest extends IBase {
  status: EFriendStatus.REQUESTED;
  owner: TUserProfile;
}

export interface IFriendAccept extends IBase {
  status: EFriendStatus.ACCEPTED;
  owner: TUserProfile;
}

export interface IGetUsersQuery {
  q?: string;
  status?: EUser.STATUS_ACTIVE | EUser.STATUS_DEACTIVE | EUser.STATUS_INACTIVE;
  limit?: string;
  offset?: string;
}

export type TGetFriendsQuery = Omit<IGetUsersQuery, 'status'> & {
  status?:
    | EFriendStatus.REQUESTED
    | EFriendStatus.ACCEPTED
    | EFriendStatus.REJECTED;
};
