"use client"
import makeRequest from '@/api/makeRequest';
import { IConfirmRes, IConfirmReq, IGetUserDetailsReq, IGetUserDetailsRes, IPasswodForgotReq, IPasswodForgotRes, IPasswordResetReq, IPasswordResetRes, IPutUserDetailsReq, IResendConfirmReq, IResendConfirmRes, ISingInReq, ISingInRes, ISingUpReq, ISingUpRes } from '@/types/Auth/auth.dtos';
// import {ProductsResponse} from "@/types/types";
import {AxiosResponse} from "axios";
import Cookies from 'js-cookie';

class AuthService {

  signIn({data} :
    {data: ISingInReq}) {
    return makeRequest<ISingInRes>({
      url: "/auth/sign-in",
      method: "POST",
      data: data,
    });
  };
  signUp({data} :
    {data: ISingUpReq}) {
    return makeRequest<ISingUpRes>({
      url: "/auth/sign-up",
      method: "POST",
      data: data,
    });
  };
  refreshToken() {
    return makeRequest<ISingInRes>({
      url: `/auth/token-refresh?refreshToken=${Cookies.get("refresh_token")}`,
      method: "POST",
    })
  };
  emailConfirm({data} :
    {data: IConfirmReq}) {
    return makeRequest<IConfirmRes>({
      url: "/auth/email-confirm",
      method: "POST",
      data: data,
    });
  };
  emailResendConfirm({data} :
    {data: IResendConfirmReq}) {
    return makeRequest<IResendConfirmRes>({
      url: "/auth/email-confirm-resend",
      method: "GET",
      params: data,
    });
  };
  passwordForgot({data} :
    {data: IPasswodForgotReq}) {
    return makeRequest<IPasswodForgotRes>({
      url: "/auth/password-forgot",
      method: "GET",
      params: data,
    });
  };
  passwordReset({data} :
    {data: IPasswordResetReq}) {
    return makeRequest<IPasswordResetRes>({
      url: "/auth/password-reset",
      method: "POST",
      data: data,
    });
  };
  getUserDetails({data} :
    {data: IGetUserDetailsReq}) {
    return makeRequest<IGetUserDetailsRes>({
      url: `/user/details`,
      method: "GET",
      params: data,
    });
  };
  putUserDetails({data} :
    {data: IPutUserDetailsReq}) {
    return makeRequest<void>({
      url: `/user/details`,
      method: "PUT",
      data: data,
    });
  };
}

export default new AuthService();