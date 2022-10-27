import { NavigateFunction } from 'react-router-dom';
import { AppDispatch } from '../store';
import {
	loginStart,
	loginSuccess,
	loginFailed,
	rememberOnSubmit,
} from 'src/store/loginSlice';
import { notification } from 'antd';
import apiRequest from 'src/api/apiRequest';

interface IUser {
	username: string;
	password: string;
}

export const login = async (
	user: IUser,
	isRemember: boolean,
	dispatch: AppDispatch,
	navigate: NavigateFunction
) => {
  dispatch(loginStart());
  try {
    const res = await apiRequest.post('api/auth/login', user);
    dispatch(loginSuccess(res.data.access_token));
    dispatch(rememberOnSubmit(!!isRemember));
    notification.success({
      message: 'Success',
      description: 'Đăng nhập thành công.',
      duration: 2,
    });
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  } catch (err) {
    dispatch(loginFailed());
    notification.error({
      message: 'Error',
      description: 'Đăng nhập thất bại!',
      duration: 2.5,
    });
  }
};
