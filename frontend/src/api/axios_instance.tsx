import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import isTokenExpired from '../utils/auth_utils';
import { fetchLogin } from './fetchLogin';
import { AUTHORIZATION_KEY } from '../app/app_constants';

interface FailedRequest {
  resolve: (value: string | PromiseLike<string | null> | null) => void;
  reject: (reason?: any) => void;
}


let isRefreshing = true;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: any, token: string | null = null): void => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token);
  });
  failedQueue = [];
};


export const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'content-type': 'application/json',
  },
  responseType: 'json',
});

http.interceptors.request.use(
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    let token = localStorage.getItem(AUTHORIZATION_KEY);

    if (!token || isTokenExpired(token)) {
      if (isRefreshing) {
        isRefreshing = false;
        try {
          token = await fetchLogin();
          processQueue(null, token);
        } catch (err) {
          console.log(err)
          processQueue(err, null);
          throw err;
        } finally {
          isRefreshing = false;
        }
      } else {
        token = await new Promise<string | null>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        });
      }
    }
    config.headers.set("Authorization", `Bearer ${token}`);
    return config;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (orginalResponse) => orginalResponse,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await fetchLogin();
        localStorage.setItem(AUTHORIZATION_KEY, newToken);
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }
        return http(originalRequest);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);
