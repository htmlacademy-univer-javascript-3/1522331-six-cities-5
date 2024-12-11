import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios';
import { getToken } from '../utils/token-utils.ts';
import { toast } from 'react-toastify';

const BACKEND_URL = 'https://14.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 3000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['x-token'] = token;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (
        error &&
        (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK')
      ) {
        toast.error(
          'Сервер недоступен, проверте подключение к интернету или повторите попытку позже',
          {
            toastId: 'server-unreachable',
          },
        );
      }
    },
  );

  return api;
};
