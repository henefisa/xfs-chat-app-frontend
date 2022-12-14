import { notification } from 'antd';
import axios from 'axios';
import { TFunction } from 'i18next';
import apiRequest from 'src/api/apiRequest';
import { TGetFriendsQuery, IGetUsersQuery, TUserInfo } from 'src/models';
import { AppDispatch } from 'src/store';
import {
  getProfileFailed,
  getProfileStart,
  getProfileSuccess,
  updateProfileFailed,
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

export const updateUserProfile = async (
  dispatch: AppDispatch,
  user: TUserInfo,
  t: TFunction<'dashboard', 'sidebar.settings'>
) => {
  try {
    await apiRequest.patch('api/users/profile', user);
    notification.success({
      message: t('success'),
      description: t('update-success'),
      duration: 2,
    });
  } catch (err) {
    dispatch(updateProfileFailed());
    notification.error({
      message: t('error'),
      description: t('update-error'),
      duration: 2,
    });
  }
};

export const getPresignUrl = async (
  key: string,
  t: TFunction<'dashboard', 'sidebar.settings'>
) => {
  try {
    const res = await apiRequest.post('api/upload/presign-url', { key: key });
    return res.data;
  } catch (err) {
    notification.error({
      message: t('error'),
      description: t('update-error'),
      duration: 1.5,
      key: '1',
    });
  }
};

export const putPresignUrl = async (
  url: string,
  file: File,
  t: TFunction<'dashboard', 'sidebar.settings'>
) => {
  try {
    await axios.put(url, file);
  } catch (err) {
    notification.error({
      message: t('error'),
      description: t('update-error'),
      duration: 1.5,
      key: '1',
    });
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
    await apiRequest.post('api/friends/cancel', {
      userRequest: id,
    });
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
  } catch (err) {
    notification.error({
      message: t('error'),
      description: t('normal-error-message'),
      duration: 1.5,
      key: '1',
    });
  }
};
