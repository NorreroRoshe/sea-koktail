"use client"
import AuthService from '@/api/Auth/AuthService';
import { IAddAddressReq, IScheduleData, IAddressFormat, IPhoneFormat, IDeleteAddressReq, IEditAddressReq, IConfirmReq, IGetUserDetailsReq, IPasswodForgotReq, IPasswordResetReq, IPutUserDetailsReq, IResendConfirmReq, ISingInReq, ISingUpReq, IAddPhoneReq, IEditPhoneReq, IDataOrderReq } from '@/types/Auth/auth.dtos';
import { IAuthStore } from '@/types/Stores/IAuthStore';
import { makeAutoObservable } from 'mobx';
import {cookies} from 'next/headers';
import Cookies from 'js-cookie';

export class AuthStore implements IAuthStore {
  userId: string = "";
  addressData: IAddressFormat[] = [];
  orderTimes : string[][] = []
  phoneData: IPhoneFormat[] = [];
  name: string = "";
  email: string = "";
  phoneNumber: string = "";
  isAuth: boolean = false;
  isLoading: boolean = false;

  deliveryType: number = 0;
  dayType: number = 0;
  address: string = '';
  phone: string = '';
  dateTime: string = '';
  description: string = '';
  payType: number = 0;
  adresSamovivoz: string = '';

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
      this.userId = response.data.id;
      this.name = response.data.name;
      this.email = response.data.email;
      this.phoneNumber = response.data.phoneNumber;
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

  async getUserAddress(data: void) {
    this.isLoading = true;
    const response = await AuthService.getUserAddress({data});

    if ('data' in response) {
      this.isLoading = false;
      this.addressData = response.data?.data ?? [];
    }
    return response;
  }
  async addUserAddress(data: IAddAddressReq) {
      this.isLoading = true;
      const response = await AuthService.addUserAddress({data});
      this.isLoading = false;
    return response;
  }
  async deleteUserAddress(id: number) {
      this.isLoading = true;
      const response = await AuthService.deleteUserAddress(id);
      this.isLoading = false;
    return response;
  }
  async editUserAddress(data: IEditAddressReq) {
      this.isLoading = true;
      const response = await AuthService.editUserAddress({data});
      this.isLoading = false;
    return response;
  }



  async getUserPhone(data: void) {
    this.isLoading = true;
    const response = await AuthService.getUserPhone({data});

    if ('data' in response) {
      this.isLoading = false;
      this.phoneData = response.data?.data ?? [];
    }
    return response;
  }
  async addUserPhone(data: IAddPhoneReq) {
      this.isLoading = true;
      const response = await AuthService.addUserPhone({data});
      this.isLoading = false;
    return response;
  }
  async deleteUserPhone(id: number) {
      this.isLoading = true;
      const response = await AuthService.deleteUserPhone(id);
      this.isLoading = false;
    return response;
  }
  async editUserPhone(data: IEditPhoneReq) {
      this.isLoading = true;
      const response = await AuthService.editUserPhone({data});
      this.isLoading = false;
    return response;
  }





  async getOrderTimes(data: void) {
    this.isLoading = true;
    const response = await AuthService.getOrderTimes({data});

    if ('data' in response) {
      this.isLoading = false;
      this.orderTimes = response.data?.days ?? [];
    }
    return response;
  }

  
  async dataOrder(data: IDataOrderReq) {
    this.isLoading = true;
    const response = await AuthService.dataOrder({data});

    if ('data' in response) {
      // this.userId = response.data.id;
      // this.name = response.data.name;
      // this.email = response.data.email;
      // this.phoneNumber = response.data.phoneNumber;
    }
      this.isLoading = false;
    return response;
  }
  
  
  setAddress(address: string) {
    this.address = address;
  }

  setPhone(phone: string) {
    this.phone = phone;
  }

  setDeliveryType(deliveryType: number) {
    this.deliveryType = deliveryType;
  }

  setDayType(dayType: number) {
    this.dayType = dayType;
  }

  setDateTime(dateTime: string) {
    this.dateTime = dateTime;
  }

  setPayType(payType: number) {
    this.payType = payType;
  }

  setDescription(description: string) {
    this.description = description;
  }

  setAdresSamovivoz(adresSamovivoz: string) {
    this.adresSamovivoz = adresSamovivoz;
  }


}