"use client"

export interface ISingInReq {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface ISingInRes {
  data: ISingInResData;
  userId: string;
  access_token: string;
  refresh_token: string;
  access_token_expires: string;
}


export interface ISingInResData {
  userId: string;
  access_token: string;
  refresh_token: string;
  access_token_expires: string;
  // message: string;
}


export interface IRefreshReq {
  refreshToken: string;
}

export interface ISingUpReq {
  email: string;
  password: string;
}

export interface IGetAddressRes {
  data: IAddressFormat[];
}

export interface IAddressFormat {
  id: number;
  title: string;
  text: string;
  flag?: number;
  userId: number;
}

export interface IGetPhoneRes {
  data: IPhoneFormat[];
}

export interface IScheduleData {
  days: string[][];
  flag?: boolean;
}


export interface IDataOrderReq {
  deliveryType: number;
  dayType: number;
  address: string;
  phone: string;
  dateTime: string;
  description?: string;
  payType: number;
  adresSamovivoz?: string;
}


export interface IDataGetOrderByIdReq {
  orderId: number;
}


export interface IChangeOrderStatusByIdReq {
  orderId: number;
}


export interface IRemoveOrderByIdReq {
  orderId: number;
}


export interface IDataGetOrderByIdRes {
  orderId: number;
  formatedOrderId: string;
  cartCount: number;
  totalCost: string;
  deliveryType: number;
  dayType: number;
  address: string;
  phone: string;
  email: string;
  dateTime: string;
  description: string;
  payType: number;
  created_at: string;
  adresSamovivoz: string;
  deliveryPrice: string;
  payStatus: number;
  payURL: string | null;
  products: OrderByIdProduct[];
}

export interface OrderByIdProduct {
  id: number;
  order_id: number;
  product_id: number | null;
  name: string;
  cost: string;
  count: number;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface IDataOrderRes {
  message: string;
  orderId: string;
  cartCount: number;
  totalCost: number;
  email: string;
  payStatus: number;
  products: IDataOrderProductsRes[];
}

export interface IDataOrderProductsRes {
  product_id: number;
  name: string;
  count: number;
  cost: string;
  total_cost: number;
}



export interface IGetUserOrdersRes {
  orders: IOrderAll[];
  orderTotalCount: number;
  allOrdersTotalCost: number;
  salePercent: string;
}

export interface IOrderAll {
  id: number;
  deliveryType: number;
  dayType: number;
  address: string;
  phone: string;
  dateTime: string;
  description: string;
  payType: number;
  adresSamovivoz: string;
  userId: number;
  total_cost: string;
  email: string;
  payStatus: number;
  payURL: string;
  created_at: string;
  updated_at: string;
}


export interface IPhoneFormat {
  id: number;
  title: string;
  text: string;
  userId: number;
}

export interface IAddAddressReq {
  title: string;
  text: string;
  flag: number;
  defaultAddress?: number;
}

export interface IAddPhoneReq {
  title: string;
  text: string;
  flag?: boolean;
}

export interface IDeleteAddressReq {
  id: number;
}

export interface IEditAddressReq {
  id: number;
  title: string;
  text: string;
  flag: number;
  defaultAddress?: number;
}

export interface IEditPhoneReq {
  id: number;
  title: string;
  text: string;
  flag?: boolean;
}

export interface ISingUpRes {
  data?: ISingUpResData;
  message?: string;
  userId: string;
}

export interface ISingUpResData {
  userId: string;
  refresh_token?: string;
  message?: string;
}

export interface IConfirmReq {
  email: string;
  code?: string;
}


export interface IConfirmRes {
  userId?: string;
  access_token?: string;
  refresh_token?: string;
  access_token_expires?: string;
  message: string;
}

export interface IResendConfirmReq {
  email: string;
}

export interface IResendConfirmRes {
  userId: string;
  access_token: string;
  refresh_token: string;
  access_token_expires: string;
  message: string;
}

export interface IPasswodForgotReq {
  Email: string;
}

export interface IPasswodForgotRes {
  userId: string;
  access_token: string;
  refresh_token: string;
  access_token_expires: string;
  message: string;
}

export interface IPasswordResetReq {
  code: string;
  email: string;
  password: string
}
export interface IPasswordResetRes {
  userId: string;
  access_token: string;
  refresh_token: string;
  access_token_expires: string;
  message: string;
}

export interface IGetUserDetailsRes {
  id: string;
  name: string;
  email: string;
  phoneNumber: string
}


export interface IGetUserOrdersReq {
  orderCount?: number;
}

export interface IGetUserDetailsReq {
  UserId: string;
}

export interface IPutUserDetailsReq {
  userId: string;
  name: string;
  phoneNumber: string
}

// {
//   "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//   "access_token": "string",
//   "expires": 0,
//   "refresh_token": "string",
//   "refresh_token_expires": 0
// }


interface Result {
  title: Title;
  subtitle: Subtitle;
  tags: string[];
  distance: Distance;
  address: Address;
  uri: string;
}

interface Title {
  text: string;
  hl: Highlight[];
}

interface Highlight {
  begin: number;
  end: number;
}

interface Subtitle {
  text: string;
}

interface Distance {
  text: string;
  value: number;
}

interface Address {
  formatted_address: string;
  component: Component[];
}

interface Component {
  name: string;
  kind: string[];
}

// Общая структура данных
export interface IGetYandexListRes {
  results: Result[];
}