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

export enum EUserStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}

export enum EUserActiveStatus {
  ACTIVE = 'ACTIVE',
  DEACTIVE = 'DEACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum EUserStatus {
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
  status: EUserStatus.ONLINE | EUserStatus.OFFLINE;
  activeStatus:
    | EUserActiveStatus.ACTIVE
    | EUserActiveStatus.DEACTIVE
    | EUserActiveStatus.INACTIVE;
  role: EUserRole.USER | EUserRole.ADMIN;

  friendStatus: null | IFriendStatusState;
}

export type TUserProfile = Omit<IUserItemResult, 'friendStatus'>;

export type TUserInfo = Omit<
  TUserProfile,
  'id' | 'createdAt' | 'updatedAt' | 'status' | 'role'
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
  status?:
    | EUserActiveStatus.ACTIVE
    | EUserActiveStatus.DEACTIVE
    | EUserActiveStatus.INACTIVE;
  limit?: string;
  offset?: string;
}

export type TGetFriendsQuery = Omit<IGetUsersQuery, 'status'> & {
  status?:
    | EFriendStatus.REQUESTED
    | EFriendStatus.ACCEPTED
    | EFriendStatus.REJECTED;
};
