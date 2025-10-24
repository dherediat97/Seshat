import { AUTHORIZATION_KEY } from '../app/app_constants';
import { http } from './axios_instance';

export async function fetchLogin() {
  const response = await http.post(`/login`, {
    username: import.meta.env.VITE_API_USERNAME,
    password: import.meta.env.VITE_API_PASSWORD,
  });
  if (response) {
    localStorage.setItem(AUTHORIZATION_KEY, response.data.token);
  }

  return response.data.token;
}
