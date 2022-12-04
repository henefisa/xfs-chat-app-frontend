import { SetStateAction } from 'react';
import { IChangeField } from 'src/models';

export const checkDisabled = (
  initUserInfo: IChangeField,
  newUserInfo: IChangeField,
  setDisabled: { (value: SetStateAction<boolean>): void; (arg0: boolean): void }
) => {
  if (
    initUserInfo.fullName !== newUserInfo.fullName ||
    initUserInfo.location !== newUserInfo.location ||
    initUserInfo.phone !== newUserInfo.phone ||
    initUserInfo.description !== newUserInfo.description
  ) {
    setDisabled(false);
  } else {
    setDisabled(true);
  }
};
