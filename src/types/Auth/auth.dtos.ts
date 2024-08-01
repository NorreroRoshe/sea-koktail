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
