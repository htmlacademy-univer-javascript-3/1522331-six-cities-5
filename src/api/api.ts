import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios';
import { getToken } from '../utils/token-utils.ts';
import { store } from '../store/store.ts';
import { AuthorizationStatus } from '../dataTypes/enums/authorization-status.ts';
import { setAuthorizationStatus } from '../store/actions.ts';

const BACKEND_URL = 'https://14.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

type DetailMessageType = {
  errorType: string;
  message: string;
};

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
    (error: AxiosError<DetailMessageType>) => {
      if (error.response && error.response.status === 401) {
        store.dispatch(
          setAuthorizationStatus(AuthorizationStatus.Unauthorized),
        );
      }
      throw error;
    },
  );

  return api;
};
