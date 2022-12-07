import { SetStateAction } from 'react';
import { IChangeField } from 'src/models/user';
import isEqual from 'lodash.isequal';

export const compareObjects = (
  initUserInfo: IChangeField,
  newUserInfo: IChangeField,
  setDisabled: { (value: SetStateAction<boolean>): void; (arg0: boolean): void }
) => {
  isEqual(initUserInfo, newUserInfo) ? setDisabled(true) : setDisabled(false);
};
