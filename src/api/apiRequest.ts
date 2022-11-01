import { notification } from 'antd';
import axios, { AxiosError } from 'axios';
import { NavigateFunction } from 'react-router-dom';

const apiRequest = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const initInterceptor = (navigate: NavigateFunction) => {
  apiRequest.interceptors.request.use(
    (config) => {
      config.headers = config.headers ?? {};

      const accessToken = localStorage.getItem('access_token') || '';

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
    (error: AxiosError) => {
      const status = error.response?.status;

      switch (status) {
        case 401: {
          notification.error({
            message: 'Error',
            description: 'Đăng nhập thất bại!',
            duration: 2,
          });

          navigate('/login');
          break;
        }
      }

      return Promise.reject(error);
    }
  );
};

export default apiRequest;
