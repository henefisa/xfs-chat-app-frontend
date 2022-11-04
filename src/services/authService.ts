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
    await apiRequest.post('api/auth/register', user);
    dispatch(registerSuccess());
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
