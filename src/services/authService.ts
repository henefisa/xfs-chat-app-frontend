import { notification } from 'antd';
import { TFunction } from 'i18next';
import { NavigateFunction } from 'react-router-dom';
import apiRequest from 'src/api/apiRequest';
import {
  loginFailed,
  loginStart,
  loginSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
  rememberOnSubmit,
} from 'src/store/authSlice';
import { getRefreshToken } from 'src/utils/getTokenFromLocal';
import { AppDispatch } from '../store';

interface IUserLogin {
  username: string;
  password: string;
}

export const login = async (
  user: IUserLogin,
  isRemember: boolean,
  dispatch: AppDispatch,
  navigate: NavigateFunction,
  t: TFunction<('login' | 'common' | 'notification')[], undefined>
) => {
  dispatch(loginStart());
  try {
    const res = await apiRequest.post('api/auth/login', user);
    dispatch(loginSuccess(res.data));
    dispatch(rememberOnSubmit(!!isRemember));

    const isActivate: boolean = await checkUserActivate(t);

    if (!isActivate) {
      navigate('/verify-account');
      return;
    }

    notification.success({
      message: t('success', { ns: 'common' }),
      description: t('login.success', { ns: 'notification' }),
      duration: 1.5,
    });

    navigate('/dashboard');
  } catch (err) {
    dispatch(loginFailed());
  }
};

export const logout = async (
  t: TFunction<('common' | 'notification')[], undefined>
) => {
  try {
    const refreshToken = getRefreshToken();
    await apiRequest.post('api/auth/logout', { refreshToken });
  } catch (err) {
    notification.error({
      message: t('error'),
      description: t('normal-error-message'),
      duration: 1.5,
      key: '1',
    });
  }
};

interface IUserRegister {
  email: string;
  username: string;
  password: string;
}

export const register = async (
  user: IUserRegister,
  dispatch: AppDispatch,
  navigate: NavigateFunction,
  t: TFunction<('register' | 'common' | 'notification')[], undefined>
) => {
  dispatch(registerStart());
  try {
    const res = await apiRequest.post('api/auth/register', user);
    dispatch(registerSuccess());
    dispatch(loginSuccess(res.data));

    notification.success({
      message: t('success', { ns: 'common' }),
      description: t('register.success', { ns: 'notification' }),
      duration: 2,
    });

    navigate('/login');
  } catch (err) {
    dispatch(registerFailed());
    notification.error({
      message: t('error', { ns: 'common' }),
      description: t('register.error', { ns: 'notification' }),
      duration: 2,
    });
  }
};

export const checkUserActivate = async (
  t: TFunction<('login' | 'common' | 'notification')[], undefined>
) => {
  try {
    const res = await apiRequest.get('api/auth/check-activate');

    return res.data;
  } catch (err) {
    notification.error({
      message: t('error', { ns: 'common' }),
      description: t('normal-error-message', { ns: 'common' }),
      duration: 1.5,
      key: '1',
    });
  }
};

export const getOtp = async (
  t: TFunction<('common' | 'verify-account')[], undefined>
) => {
  try {
    await apiRequest.post('api/auth/send-otp');
    notification.success({
      message: t('success'),
      description: t('receive-otp', { ns: 'verify-account' }),
      duration: 2,
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

export const checkOtp = async (
  otp: string,
  t: TFunction<('common' | 'verify-account')[], undefined>
) => {
  try {
    const res = await apiRequest.post('api/auth/check-otp', { otp });

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
