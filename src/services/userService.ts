import { notification } from 'antd';
import { TFunction } from 'i18next';
import apiRequest from 'src/api/apiRequest';
import { AppDispatch } from 'src/store';
import {
  getProfileFailed,
  getProfileStart,
  getProfileSuccess,
  updateProfile,
} from 'src/store/userSlice';

interface newProfile {
  username: string;
  location: string;
  email: string;
  phone: string;
  description: string;
}

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
  user: newProfile,
  t: TFunction<'dashboard', 'sidebar.settings'>
) => {
  try {
    const res = await apiRequest.put('api/users/profile', user);
    dispatch(updateProfile(res.data));
    notification.success({
      message: t('success'),
      description: t('update-success'),
      duration: 2,
    });
  } catch (err) {
    dispatch(getProfileFailed());
    notification.error({
      message: t('error'),
      description: t('update-error'),
      duration: 2,
    });
  }
};

export const getUsers = async (
  keyword: string,
  t: TFunction<('common' | 'dashboard')[], undefined>
) => {
  try {
    const res = await apiRequest.get('api/users', { params: { q: keyword } });
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
  t: TFunction<'common', undefined>
) => {
  try {
    const res = await apiRequest.post('api/friends/cancel-request', {
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
