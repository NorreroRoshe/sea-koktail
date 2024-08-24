"use client"
import { APIError } from "@/api/makeRequest";
import { OrderByIdProduct, IGetUserOrdersReq, IGetUserOrdersRes, IDataGetOrderByIdReq, IDataGetOrderByIdRes, IConfirmRes, IGetPhoneRes, IDataOrderReq, IDataOrderRes, IEditPhoneReq, IScheduleData, IAddPhoneReq, IPhoneFormat, IAddressFormat, IConfirmReq, IGetUserDetailsReq, IDeleteAddressReq, IGetAddressRes, IEditAddressReq, IAddAddressReq, IGetUserDetailsRes, IPasswodForgotReq, IPasswodForgotRes, IPasswordResetReq, IPasswordResetRes, IPutUserDetailsReq, IResendConfirmReq, IResendConfirmRes, ISingInReq, ISingInRes, ISingUpReq, ISingUpRes, IOrderAll } from "../Auth/auth.dtos";
import { AxiosResponse } from "@/api/makeRequest";

export interface IAuthStore {
  userId: string;
  addressData: IAddressFormat[];
  phoneData: IPhoneFormat[];
  orderTimes: string[][];
  flagOrderTimes: boolean;
  name: string,
  email: string,
  phoneNumber: string,
  isLoading: boolean,
  isAuth: boolean,
  orderId: number,
  orderTotalCount: number;
  ordersAll: IOrderAll[];
  orderByIdProduct: OrderByIdProduct[];

  deliveryType: number,
  dayType: number,
  address: string,
  phone: string,
  dateTime: string,
  description: string,
  payType: number,
  adresSamovivoz: string,

  signOut: () => void;

  signIn: (data: ISingInReq) => Promise<APIError | AxiosResponse<ISingInRes, any>>;
  signUp: (data: ISingUpReq) => Promise<APIError | AxiosResponse<ISingUpRes, any>>;
  refreshToken: () => Promise<APIError | AxiosResponse<ISingInRes, any>>;
  emailConfirm: (data: IConfirmReq) => Promise<APIError | AxiosResponse<IConfirmRes, any>>;
  emailResendConfirm: (data: IResendConfirmReq) => Promise<APIError | AxiosResponse<IResendConfirmRes, any>>;
  passwordForgot: (data: IPasswodForgotReq) => Promise<APIError | AxiosResponse<IPasswodForgotRes, any>>;
  passwordReset: (data: IPasswordResetReq) => Promise<APIError | AxiosResponse<IPasswordResetRes, any>>;
  getUserDetails: (data: IGetUserDetailsReq) => Promise<APIError | AxiosResponse<IGetUserDetailsRes, any>>;
  putUserDetails: (data: IPutUserDetailsReq) => Promise<APIError | AxiosResponse<void, any>>;

  getUserAddress: (data: void) => Promise<APIError | AxiosResponse<IGetAddressRes, any>>;
  addUserAddress: (data: IAddAddressReq) => Promise<APIError | AxiosResponse<void, any>>;
  deleteUserAddress: (id: number) => Promise<APIError | AxiosResponse<void, any>>;
  editUserAddress: (data: IEditAddressReq) => Promise<APIError | AxiosResponse<void, any>>;

  getUserPhone: (data: void) => Promise<APIError | AxiosResponse<IGetPhoneRes, any>>;
  addUserPhone: (data: IAddPhoneReq) => Promise<APIError | AxiosResponse<void, any>>;
  deleteUserPhone: (id: number) => Promise<APIError | AxiosResponse<void, any>>;
  editUserPhone: (data: IEditPhoneReq) => Promise<APIError | AxiosResponse<void, any>>;

  getOrderTimes: (data: void) => Promise<APIError | AxiosResponse<IScheduleData, any>>;

  dataOrder: (data: IDataOrderReq) => Promise<APIError | AxiosResponse<IDataOrderRes, any>>;
  dataGetOrderById: (data: IDataGetOrderByIdReq) => Promise<APIError | AxiosResponse<IDataGetOrderByIdRes, any>>;
  getUserOrders: (data: IGetUserOrdersReq) => Promise<APIError | AxiosResponse<IGetUserOrdersRes, any>>;
  
  setAddress: (address: string) => void;
  setPhone: (phone: string) => void;
  setDeliveryType: (deliveryType: number) => void;
  setDayType: (dayType: number) => void;
  setDateTime: (dateTime: string) => void;
  setPayType: (payType: number) => void;
  setDescription: (description: string) => void;
  setAdresSamovivoz: (adresSamovivoz: string) => void;
}