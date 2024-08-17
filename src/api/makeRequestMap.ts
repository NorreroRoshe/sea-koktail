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
  url = 'http://localhost:7217/api',
  method = 'GET',
  authToken = false,
  headers = {},
  params = {},
  data = {},
}: TMakeRequestParams): APIResponse<Type> => {
  url = `${process.env.NEXT_PUBLIC_YANDEX_URL}${url}`;

  headers.authorization = (
    `Bearer 559e1f9b-e496-40c2-9740-90d74cacebed`
  );
  headers.contentType = 'text/plain'
  
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
    const responseErrors = errors.response?.data?.errors;
    const status = errors?.response?.status as number;
    const meta = errors?.response?.data?.meta;

    return { message: message, status };
  });
};

export default makeRequestMap;