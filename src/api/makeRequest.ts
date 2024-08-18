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
  errors: {
    [key: string]: string[]; // Здесь ключи - это названия полей, а значения - массивы строк с сообщениями об ошибках
  };
  status: number;
  statusText: string;
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
  config: InternalAxiosRequestConfig<D>;
  request?: any;
}

type APIResponse<Type> = Promise<AxiosResponse<Type> | APIError>;
const makeRequest = <Type>({
  url = 'http://localhost:7217/api',
  method = 'GET',
  authToken = false,
  headers = {},
  params = {},
  data = {},
}: TMakeRequestParams): APIResponse<Type> => {
  url = `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`;

  // headers.append("Content-Type", "application/json");
  // headers.append("Accept", "application/json");

  headers.authorization = (
    `Bearer ${Cookies.get("access_token") || ""}`
  );

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

export default makeRequest;