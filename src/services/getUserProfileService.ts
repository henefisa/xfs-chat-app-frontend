import { notification } from 'antd';
import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';
import apiRequest from 'src/api/apiRequest';
import { AppDispatch } from 'src/store';
import { logoutSuccess } from 'src/store/authSlice';
import {
  getProfileFailed,
  getProfileStart,
  getProfileSuccess,
} from 'src/store/userSlice';
export const getUserProfile = async (
  dispatch: AppDispatch,
  navigate: NavigateFunction
) => {
  dispatch(getProfileStart());
  try {
    const res = await apiRequest.get('api/users/profile');
    dispatch(getProfileSuccess(res.data));
  } catch (err) {
    dispatch(getProfileFailed());
    dispatch(logoutSuccess());

    if (axios.isAxiosError(err) && err.response?.status === 401) {
      notification.error({
        message: 'Error',
        description: 'Hết phiên đăng nhập!',
        duration: 2,
      });
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    }
  }
};
