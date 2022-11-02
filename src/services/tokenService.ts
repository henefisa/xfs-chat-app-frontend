import { notification } from 'antd';
import apiRequest from 'src/api/apiRequest';
import { getRefreshToken } from 'src/utils/getTokenFromLocal';

export const refresh = async () => {
  try {
    const refreshToken = getRefreshToken();
    const res = await apiRequest.post('api/auth/refresh-token', {
      refreshToken,
    });

    localStorage.setItem('token', JSON.stringify(res.data));

    return true;
  } catch (err) {
    notification.error({
      message: 'Error',
      description: 'Có lỗi xảy ra!',
      duration: 5,
    });

    return false;
  }
};
