import { notification } from 'antd';
import { TFunction } from 'i18next';
import apiRequest from 'src/api/apiRequest';
import {
  TGetFriendsQuery,
  IGetUsersQuery,
  TConversationQuery,
} from 'src/models';
import { AppDispatch } from 'src/store';
import {
  getProfileFailed,
  getProfileStart,
  getProfileSuccess,
} from 'src/store/userSlice';

export const checkUsernameExist = async (
  username: string,
  t: TFunction<('register' | 'common' | 'notification')[], undefined>
) => {
  try {
    const res = await apiRequest.post('api/users/check-username-exists', {
      username,
    });
    return res.data;
  } catch (err) {
    notification.error({
      message: t('error'),
      description: t('normal-error-message'),
      duration: 1.5,
      key: '1',
    });
  }
};

export const checkEmailExist = async (
  email: string,
  t: TFunction<('register' | 'common' | 'notification')[], undefined>
) => {
  try {
    const res = await apiRequest.post('api/users/check-email-exists', {
      email,
    });
    return res.data;
  } catch (err) {
    notification.error({
      message: t('error'),
      description: t('normal-error-message'),
      duration: 1.5,
      key: '1',
    });
  }
};

export const getUserProfile = async (dispatch: AppDispatch) => {
  dispatch(getProfileStart());
  try {
    const res = await apiRequest.get('api/users/profile');
    dispatch(getProfileSuccess(res.data));
  } catch (err) {
    dispatch(getProfileFailed());
  }
};

export const getUsers = async (
  query: IGetUsersQuery,
  t: TFunction<('common' | 'dashboard')[], undefined>
) => {
  try {
    const res = await apiRequest.get('api/users', {
      params: query,
    });

    return res.data;
  } catch (err) {
    notification.error({
      message: t('error'),
      description: t('normal-error-message'),
      duration: 1.5,
      key: '1',
    });
  }
};

export const sendFriendRequest = async (
  id: string,
  t: TFunction<'common', undefined>
) => {
  try {
    const res = await apiRequest.post('api/friends', { userTarget: id });

    return res.data;
  } catch (err) {
    notification.error({
      message: t('error'),
      description: t('normal-error-message'),
      duration: 1.5,
      key: '1',
    });
  }
};

export const cancelFriendRequest = async (
  id: string,
  t: TFunction<('common' | 'dashboard')[], undefined>
) => {
  try {
    const res = await apiRequest.post('api/friends/cancel', {
      userRequest: id,
    });

    return res.data;
  } catch (err) {
    notification.error({
      message: t('error'),
      description: t('normal-error-message'),
      duration: 1.5,
      key: '1',
    });
  }
};

export const getFriends = async (
  query: TGetFriendsQuery,
  t: TFunction<'common', undefined>
) => {
  try {
    const res = await apiRequest.get('api/friends', {
      params: query,
    });

    return res.data;
  } catch (err) {
    notification.error({
      message: t('error'),
      description: t('normal-error-message'),
      duration: 1.5,
      key: '1',
    });
  }
};

export const acceptRequestFriend = async (
  id: string,
  t: TFunction<('common' | 'dashboard')[], undefined>
) => {
  try {
    await apiRequest.post('api/friends/approve', {
      userRequest: id,
    });

    return true;
  } catch (err) {
    notification.error({
      message: t('error'),
      description: t('normal-error-message'),
      duration: 1.5,
      key: '1',
    });

    return false;
  }
};

export const getListConversation = async (
  query: TConversationQuery,
  t: TFunction<'common', undefined>
) => {
  try {
    const res = await apiRequest.get('api/conversations', { params: query });

    return res.data;
  } catch (err) {
    notification.error({
      message: t('error'),
      description: t('normal-error-message'),
      duration: 1.5,
      key: '1',
    });
  }
};
