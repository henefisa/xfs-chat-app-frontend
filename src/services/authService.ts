import { notification } from 'antd';
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
  navigate: NavigateFunction
) => {
  dispatch(loginStart());
  try {
    const res = await apiRequest.post('api/auth/login', user);
    localStorage.setItem('access_token', res.data.access_token);
    dispatch(loginSuccess());
    dispatch(rememberOnSubmit(!!isRemember));

    notification.success({
      message: 'Success',
      description: 'Đăng nhập thành công!',
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
  navigate: NavigateFunction
) => {
  dispatch(registerStart());
  try {
    await apiRequest.post('api/auth/register', user);
    dispatch(registerSuccess());
    notification.success({
      message: 'Success',
      description: 'Bạn đã đăng kí thành công.',
      duration: 2,
    });

    navigate('/login');
  } catch (err) {
    dispatch(registerFailed());
    notification.error({
      message: 'Error',
      description: 'Đăng kí thất bại!',
      duration: 2,
    });
  }
};
