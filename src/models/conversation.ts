import { IBase } from './base';
import { IGetUsersQuery } from './user';

export type TConversationQuery = Omit<IGetUsersQuery, 'status'>;

export interface IConversation extends IBase {
  title: string;
}
