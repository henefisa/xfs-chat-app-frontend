import apiRequest from 'src/api/apiRequest';
import { AppDispatch } from 'src/store';
import {
  getProfileFailed,
  getProfileStart,
  getProfileSuccess,
} from 'src/store/userSlice';
export const getUserProfile = async (
  dispatch: AppDispatch,
  accessToken: string
) => {
  dispatch(getProfileStart());
  try {
    const res = await apiRequest.get('api/users/profile', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(getProfileSuccess(res.data));
  } catch (err) {
    dispatch(getProfileFailed());
    console.log(err);
  }
};
