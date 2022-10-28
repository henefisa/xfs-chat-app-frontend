import axios, { AxiosError } from 'axios';

const apiRequest = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiRequest.interceptors.request.use(
  (config) => {
    config.headers = config.headers ?? {};

    let accessToken: string;
    const loginStore = localStorage.getItem('persist:login');

    if (loginStore) {
      accessToken = JSON.parse(
        JSON.parse(loginStore)?.login
      )?.currentAccessToken;
    } else {
      accessToken = '';
    }

    config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : '';

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
    return Promise.reject(error);
  }
);

export default apiRequest;
