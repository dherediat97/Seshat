import axios from 'axios';
import { baseUrlAPI } from '../app/app_urls';

export const http = axios.create({
  baseURL: baseUrlAPI,
  headers: {
    'content-type': 'application/json',
  },
  responseType: 'json',
});

http.interceptors.request.use((config) => {
  const authToken = localStorage.getItem('authToken');
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
        .post(`${baseUrlAPI}/login`, {
          username: import.meta.env.VITE_API_USERNAME,
          password: import.meta.env.VITE_API_PASSWORD,
        })
        .then((response) => {
          localStorage.setItem('authToken', response.data.token);
        });
    } else if (status === 404) {
      // Handle not found errors
      console.log('Method not found');
    } else {
      // Handle other errors
      console.error('An error occurred:', error);
    }

    return Promise.reject(error);
  }
);
