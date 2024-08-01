"use client"
import { IFileUrl } from "../Product/product.types";

export type CartItem = {
  products?: any;
  id: string;
  name: string;
  description?: string;
  type: number;
  article?: string;
  price: number;
  colors?: number[];
  diameter?: number[];
  height?: number[];
  length?: number[];
  width?: number[];
  discount: number;
  chandelierTypes?: number[];
  plinth?: string;
  lampCount?: number;
  rating: number;
  availability: number;
  collectionId?: string;
  files: IFileUrl[];
  count: number;
};

export interface CartSliceState {
  totalCount: number;
  totalPrice: number;
  totalDiscountPrice: number;
  items: CartItem[];
  cart: ICartLocalState;
}

export type ICartLocalState = ICartLocalItem[];

export interface ICartLocalItem {
  count: number;
  id: string;
}



export type ICartToPay = {
  id: string;
  name: string;
  article: string | undefined;
  count: number;
  price: number;
}[];


export type ITotalCart = {
  totalPrice: number;
  totalCount: number;
  totaDiscountPrice: number;
};