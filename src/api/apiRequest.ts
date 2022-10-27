import axios from 'axios';

import apiConfig from './apiConfig';

const apiRequest = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiRequest;
