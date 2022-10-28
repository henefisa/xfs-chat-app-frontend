import axios from 'axios';

const apiRequest = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiRequest.interceptors.request.use((config) => {
  config.headers = config.headers ?? {};

  const loginStore = localStorage.getItem('persist:login');
  let accessToken: string;

  if (loginStore) {
    accessToken = JSON.parse(JSON.parse(loginStore)?.login)?.currentAccessToken;
  } else {
    accessToken = '';
  }

  config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : '';

  return config;
});

export default apiRequest;
