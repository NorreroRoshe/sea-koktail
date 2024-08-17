"use client"
import makeRequest from '@/api/makeRequest';
import makeRequestMap from '@/api/makeRequestMap';
import { IConfirmRes, IScheduleData, IDataOrderReq, IDataOrderRes, IConfirmReq, IGetUserDetailsReq, IGetUserDetailsRes, IPasswodForgotReq, IPasswodForgotRes, IPasswordResetReq, IPasswordResetRes, IPutUserDetailsReq, IAddAddressReq, IGetAddressRes, IGetPhoneRes, IAddPhoneReq, IEditPhoneReq, IResendConfirmReq, IResendConfirmRes, ISingInReq, ISingInRes, ISingUpReq, ISingUpRes, IDeleteAddressReq, IEditAddressReq, IGetYandexListRes } from '@/types/Auth/auth.dtos';
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

  
  

  getUserAddress({data} :
    {data: void}) {
    return makeRequest<IGetAddressRes>({
      url: "/user/addresses/get",
      method: "POST",
      data: data,
    });
  };

  addUserAddress({data} :
    {data: IAddAddressReq}) {
    return makeRequest<void>({
      url: "/user/addresses/add",
      method: "POST",
      data: data,
    });
  };
  deleteUserAddress(id: number) {
    return makeRequest<void>({
      url: "/user/addresses/delete",
      method: "POST",
      data: {
        id: id
      }
    });
  };
  editUserAddress({data} :
    {data: IEditAddressReq}) {
    return makeRequest<void>({
      url: "/user/addresses/edit",
      method: "POST",
      data: data,
    });
  };



  
  
  getUserPhone({data} :
    {data: void}) {
    return makeRequest<IGetPhoneRes>({
      url: "/user/phones/get",
      method: "POST",
      data: data,
    });
  };
  addUserPhone({data} :
    {data: IAddPhoneReq}) {
    return makeRequest<void>({
      url: "/user/phones/add",
      method: "POST",
      data: data,
    });
  };
  deleteUserPhone(id: number) {
    return makeRequest<void>({
      url: "/user/phones/delete",
      method: "POST",
      data: {
        id: id
      }
    });
  };
  editUserPhone({data} :
    {data: IEditPhoneReq}) {
    return makeRequest<void>({
      url: "/user/phones/edit",
      method: "POST",
      data: data,
    });
  };





  getOrderTimes({data} :
    {data: void}) {
    return makeRequest<IScheduleData>({
      url: "/order/times",
      method: "GET",
      data: data,
    });
  };


  dataOrder({data} :
    {data: IDataOrderReq}) {
    return makeRequest<IDataOrderRes>({
      url: "/order",
      method: "POST",
      data: data,
    });
  };



















  
  getValidAddress({data} :
    {data: string}) {
    return makeRequestMap<IGetYandexListRes>({
      url: `&text=${data}&ll=55.75583,37.61778`,
      method: "GET"
    });
  };
}

export default new AuthService();