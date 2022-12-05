import { notification } from 'antd';
import axios, { AxiosError } from 'axios';
import { TFunction } from 'i18next';
import { NavigateFunction } from 'react-router-dom';
import { refreshAccessToken } from 'src/services/tokenService';
import { AppDispatch } from 'src/store';
import { logoutSuccess } from 'src/store/authSlice';
import { getAccessToken } from 'src/utils/getTokenFromLocal';

const apiRequest = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const initInterceptor = (
  navigate: NavigateFunction,
  dispatch: AppDispatch,
  t: TFunction<('common' | 'notification')[], undefined>
) => {
  apiRequest.interceptors.request.use(
    (config) => {
      config.headers = config.headers ?? {};

      const accessToken = getAccessToken();

      config.headers.Authorization = `Bearer ${accessToken}`;

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  apiRequest.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error: AxiosError) => {
      const status = error.response?.status;
      const originalRequest = error.config ?? {};

      switch (status) {
        case 401: {
          if (originalRequest.url === 'api/auth/login') {
            // Login Failed
            notification.error({
              message: t('error'),
              description: t('login.error', { ns: 'notification' }),
              duration: 2,
              key: '1',
            });

            return Promise.reject(error);
          }

          // Refresh token
          const isRefreshSuccess = await refreshAccessToken(t);

          if (!isRefreshSuccess) {
            // Refresh token error
            dispatch(logoutSuccess());
            navigate('/login');

            return Promise.reject(error);
          }

          // Refresh token success
          // Not remember -> getUserProfile error -> refresh token -> save token to sessionStorage
          // Remember -> getUserProfile error -> refresh token -> save token to localStorage

          // Call old request
          try {
            const res = await axios.request({
              ...originalRequest,
              headers: {
                Authorization: `Bearer ${getAccessToken()}`,
              },
            });

            return res;
          } catch (err) {
            return Promise.reject(err);
          }
        }
      }
    }
  );
};

export default apiRequest;
