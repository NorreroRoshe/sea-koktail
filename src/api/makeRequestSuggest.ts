"use client"
import axios, {AxiosRequestConfig, AxiosResponseHeaders, InternalAxiosRequestConfig, RawAxiosResponseHeaders} from 'axios';
import Cookies from 'js-cookie';

interface TMakeRequestParams extends AxiosRequestConfig {
  authToken?: boolean;
}

export type APIError<T = any, D = any> = {
  errors?: {
    [key: string]: string[] | object[];
  };
  data?: T;
  message?: string;
  status: number;
};



export interface AxiosResponse<T = any, D = any> {
  data: T;
  message?: string;
  status: number;
  statusText: string;
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
  config: InternalAxiosRequestConfig<D>;
  request?: any;
}

type APIResponse<Type> = Promise<AxiosResponse<Type> | APIError>;
const makeRequestMap = <Type>({
  url = '',
  method = 'GET',
  headers = {},
  params = {},
  data = {},
}: TMakeRequestParams): APIResponse<Type> => {
  url = `${process.env.NEXT_PUBLIC_YANDEX_URLS}${url}`; // полный URL с ключом API

  headers['Authorization'] = `Bearer ${process.env.NEXT_PUBLIC_YANDEX_API_KEYS}`;
  headers['Content-Type'] = 'text/plain';

  return axios
  .request<Type>({
    url,
    method,
    headers,
    params,
    data,
  })
  .catch((errors) => {
    const message = errors.response?.data?.message as string;
    const status = errors?.response?.status as number;

    return { message: message, status };
  });
};

export default makeRequestMap;