import { notification } from 'antd';
import { TFunction } from 'i18next';
import apiRequest from 'src/api/apiRequest';
import { getRefreshToken } from 'src/utils/getTokenFromLocal';

export const refreshAccessToken = async (
  t: TFunction<('common' | 'notification')[], undefined>
) => {
  try {
    const refreshToken = getRefreshToken();
    const res = await apiRequest.post('api/auth/refresh-token', {
      refreshToken,
    });

    localStorage.setItem('token', JSON.stringify(res.data));

    return true;
  } catch (err) {
    notification.error({
      message: t('error'),
      description: t('normal-error-message'),
      duration: 2,
    });

    return false;
  }
};
