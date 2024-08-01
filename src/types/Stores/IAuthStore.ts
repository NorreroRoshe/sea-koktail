"use client"
import { APIError } from "@/api/makeRequest";
import { IConfirmRes, IConfirmReq, IGetUserDetailsReq, IGetUserDetailsRes, IPasswodForgotReq, IPasswodForgotRes, IPasswordResetReq, IPasswordResetRes, IPutUserDetailsReq, IResendConfirmReq, IResendConfirmRes, ISingInReq, ISingInRes, ISingUpReq, ISingUpRes } from "../Auth/auth.dtos";
import { AxiosResponse } from "@/api/makeRequest";

export interface IAuthStore {
  userId: string;
  name: string,
  email: string,
  phoneNumber: string,
  isLoading: boolean,
  isAuth: boolean,

  signOut: () => void;

  signIn: (data: ISingInReq) => Promise<APIError | AxiosResponse<ISingInRes, any>>;
  signUp: (data: ISingUpReq) => Promise<APIError | AxiosResponse<ISingUpRes, any>>;
  refreshToken: () => Promise<APIError | AxiosResponse<ISingInRes, any>>;
  emailConfirm: (data: IConfirmReq) => Promise<APIError | AxiosResponse<IConfirmRes, any>>;
  emailResendConfirm: (data: IResendConfirmReq) => Promise<APIError | AxiosResponse<IResendConfirmRes, any>>;
  passwordForgot: (data: IPasswodForgotReq) => Promise< APIError | AxiosResponse<IPasswodForgotRes, any>>;
  passwordReset: (data: IPasswordResetReq) => Promise<APIError | AxiosResponse<IPasswordResetRes, any>>;
  getUserDetails: (data: IGetUserDetailsReq) => Promise<APIError | AxiosResponse<IGetUserDetailsRes, any>>;
  putUserDetails: (data: IPutUserDetailsReq) => Promise<APIError | AxiosResponse<void, any>>;
}