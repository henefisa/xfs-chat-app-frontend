import { NavigateFunction } from 'react-router-dom';
import apiRequest from 'src/api/apiRequest';
import { AppDispatch } from '../store';
import {
  registerStart,
  registerSuccess,
  registerFailed,
} from '../store/registerSlice';

interface User {
  email: string;
  username: string;
  password: string;
}

export const register = async (
  user: User,
  dispatch: AppDispatch,
  navigate: NavigateFunction
) => {
  dispatch(registerStart());
  try {
    await apiRequest.post('api/auth/register', user);
    dispatch(registerSuccess());
    navigate('/login');
  } catch (err) {
    dispatch(registerFailed());
  }
};
