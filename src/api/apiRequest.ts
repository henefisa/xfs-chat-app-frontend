import { notification } from 'antd';
import axios, { AxiosError } from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { refresh } from 'src/services/tokenService';
import { AppDispatch } from 'src/store';
import { logoutSuccess } from 'src/store/authSlice';
import getIsRemember from 'src/utils/getIsRemember';
import { getAccessToken } from 'src/utils/getTokenFromLocal';

const apiRequest = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const initInterceptor = (
  navigate: NavigateFunction,
  dispatch: AppDispatch
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
      const isRemember = getIsRemember();

      switch (status) {
        case 401: {
          if (originalRequest.url === 'api/auth/login') {
            // Login Failed
            notification.error({
              message: 'Error',
              description: 'Đăng nhập thất bại!',
              duration: 2,
            });

            return Promise.reject(error);
          }

          // Not remember -> not refresh token -> getUserProfile error -> logout -> back to /login
          if (!isRemember) {
            dispatch(logoutSuccess());
            navigate('/login');

            notification.error({
              message: 'Error',
              description: 'Có lỗi xảy ra!',
              duration: 2,
            });

            console.log(2);

            return Promise.reject(error);
          }

          // Remember -> Refresh Token
          const isRefreshSuccess = await refresh();

          if (!isRefreshSuccess) {
            // Refresh token error
            dispatch(logoutSuccess());
            navigate('/login');

            return Promise.reject(error);
          }

          // Refresh token success
          originalRequest.headers = originalRequest.headers ?? {};

          originalRequest.headers[
            'Authorization'
          ] = `Bearer ${getAccessToken()}`;

          navigate('/login');

          return axios(originalRequest);
        }
      }

      return Promise.reject(error);
    }
  );
};

export default apiRequest;
