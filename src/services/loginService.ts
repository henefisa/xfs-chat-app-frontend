import { NavigateFunction } from 'react-router-dom';
import { AppDispatch } from '../store';
import { loginStart, loginSuccess, loginFailed } from 'src/store/loginSlice';
import { notification } from 'antd';
import apiRequest from 'src/api/apiRequest';

interface IUser {
  username: string;
  password: string;
  remember: boolean;
}

export const login = async (
  user: IUser,
  dispatch: AppDispatch,
  navigate: NavigateFunction
) => {
  dispatch(loginStart());
  try {
    const res = await apiRequest.post('api/auth/login', user);
    if (res.data.access_token) {
      dispatch(loginSuccess(res.data.access_token));
      navigate('/dashboard');
    } else {
      dispatch(loginFailed());
      notification.error({
        message: 'Error',
        description: 'Đăng nhập thất bại!',
        duration: 2.5,
      });
    }
  } catch (err) {
    dispatch(loginFailed());
    notification.error({
      message: 'Error',
      description: 'Đăng nhập thất bại!',
      duration: 2.5,
    });
  }
};
