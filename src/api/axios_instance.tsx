import axios from 'axios';
import { AUTHORIZATION_KEY } from '../app/app_constants';

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'content-type': 'application/json',
  },
  responseType: 'json',
});

http.interceptors.request.use((config) => {
  const authToken = localStorage.getItem(AUTHORIZATION_KEY);
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response ? error.response.status : null;

    if (status === 401) {
      // Handle unauthorized access
      http
        .post(`/login`, {
          username: import.meta.env.VITE_API_USERNAME,
          password: import.meta.env.VITE_API_PASSWORD,
        })
        .then((response) => {
          localStorage.setItem(AUTHORIZATION_KEY, response.data.token);
        });
    } else if (status === 404) {
      // Handle not found errors
      console.error('Method not found');
    } else {
      // Handle other errors
      console.error('An error occurred:', error);
    }

    return Promise.reject(error);
  }
);
