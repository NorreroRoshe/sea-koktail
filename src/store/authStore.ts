"use client"
import AuthService from '@/api/Auth/AuthService';
import { IConfirmReq, IGetUserDetailsReq, IPasswodForgotReq, IPasswordResetReq, IPutUserDetailsReq, IResendConfirmReq, ISingInReq, ISingUpReq } from '@/types/Auth/auth.dtos';
import { IAuthStore } from '@/types/Stores/IAuthStore';
import { makeAutoObservable } from 'mobx';
import {cookies} from 'next/headers';
import Cookies from 'js-cookie';

export class AuthStore implements IAuthStore {
  userId: string = "";
  name: string = "";
  email: string = "";
  phoneNumber: string = "";
  isAuth: boolean = false;
  isLoading: boolean = false;
  constructor() {
    makeAutoObservable(this);
  }

  signOut() {
    this.userId = "";
    this.isAuth = false;
      Cookies.remove("access_token")
      Cookies.remove("refresh_token")
  }


  async signIn(data: ISingInReq) {
    this.isLoading = true;
    const response = await AuthService.signIn({ data });

    if ('data' in response) {
      this.userId = response?.data?.userId ?? '';
      this.isAuth = true;
      Cookies.set("access_token", response?.data?.access_token ?? '')
      Cookies.set("refresh_token", response?.data?.refresh_token ?? '')
      Cookies.set("access_token_expires", response?.data?.access_token_expires ?? '')
    }
    this.isLoading = false;
    return response;
  }

  async signUp(data: ISingUpReq) {
    this.isLoading = true;
    const response = await AuthService.signUp({ data });

    console.log(response,'responseresponse')
    
    if ('data' in response) {
      this.userId = response?.data?.userId ?? '';
    }
    this.isLoading = false;
    return response;
  }


  // Обработка успешного обновления токена
  async refreshToken() {
    this.isLoading = true;
    const response = await AuthService.refreshToken();

    if ('data' in response) {
      this.userId = response?.data?.userId ?? '';
      this.isAuth = true;
      Cookies.set("access_token", response?.data?.access_token ?? '')
      Cookies.set("refresh_token", response?.data?.refresh_token ?? '')
      Cookies.set("access_token_expires", response?.data?.access_token_expires ?? '')
    }
    this.isLoading = false;
    return response;
  }



  async emailConfirm(data: IConfirmReq) {
    this.isLoading = true;
    const response = await AuthService.emailConfirm({data});
    // console.log(response,'responseresponse')
    if ('data' in response) {
      // this.isLoading = false;
      this.userId = response?.data?.userId ?? '';
      this.isAuth = true;
      Cookies.set("access_token", response?.data?.access_token ?? '')
      Cookies.set("refresh_token", response?.data?.refresh_token ?? '')
      Cookies.set("access_token_expires", response?.data?.access_token_expires ?? '')
    }
    return response;
  }



  async emailResendConfirm(data: IResendConfirmReq) {
    this.isLoading = true;
    const response = await AuthService.emailResendConfirm({data});

    if ('data' in response) {
      this.userId = response?.data?.userId ?? '';
      this.isAuth = false;
      Cookies.set("access_token", response?.data?.access_token ?? '')
      Cookies.set("refresh_token", response?.data?.refresh_token ?? '')
      Cookies.set("access_token_expires", response?.data?.access_token_expires ?? '')
    }
    this.isLoading = false;
    return response;
  }


  async passwordForgot(data: IPasswodForgotReq) {
    this.isLoading = true;
    const response = await AuthService.passwordForgot({data});

    if ('data' in response) {
      this.userId = response?.data?.userId ?? '';
      // this.isAuth = false;
    }
    this.isLoading = false;
    return response;
  }


  async passwordReset(data: IPasswordResetReq) {
    this.isLoading = true;
    const response = await AuthService.passwordReset({data});

    if ('data' in response) {
      // this.userId = response.data.userId;
      // this.isAuth = false;
      this.userId = response?.data?.userId ?? '';
      this.isAuth = false;
      Cookies.set("access_token", response?.data?.access_token ?? '')
      Cookies.set("refresh_token", response?.data?.refresh_token ?? '')
      Cookies.set("access_token_expires", response?.data?.access_token_expires ?? '')
  }
  this.isLoading = false;
    return response;
  }

  async getUserDetails(data: IGetUserDetailsReq) {
    this.isLoading = true;
    const response = await AuthService.getUserDetails({data});

    if ('data' in response) {
      this.userId = response?.data?.id ?? '';
      this.name = response?.data?.name ?? '';
      this.email = response?.data?.email ?? '';
      this.phoneNumber = response?.data?.phoneNumber ?? '';
    }
      this.isLoading = false;
    return response;

  }

  async putUserDetails(data: IPutUserDetailsReq) {
    this.isLoading = true;
    const response = await AuthService.putUserDetails({data});

    // if ('data' in response) {
      this.isLoading = false;
    // }
    return response;
  }
}
