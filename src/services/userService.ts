import apiRequest from 'src/api/apiRequest';
import { AppDispatch } from 'src/store';
import { logoutSuccess } from 'src/store/authSlice';
import {
  getProfileFailed,
  getProfileStart,
  getProfileSuccess,
} from 'src/store/userSlice';

export const checkUsernameExist = async (username: string) => {
  try {
    const res = await apiRequest.post('api/users/check-username-exists', {
      username,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const checkEmailExist = async (email: string) => {
  try {
    const res = await apiRequest.post('api/users/check-email-exists', {
      email,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getUserProfile = async (dispatch: AppDispatch) => {
  dispatch(getProfileStart());
  try {
    const res = await apiRequest.get('api/users/profile');
    dispatch(getProfileSuccess(res.data));
  } catch (err) {
    dispatch(getProfileFailed());
    dispatch(logoutSuccess());
  }
};
