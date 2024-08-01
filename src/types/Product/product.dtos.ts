"use client"
import { IFilter } from "./filter.types";
import { Product } from "./product.types";

export interface IGetProductsRes {
  cartCount: number;
  favouritesCount: number;
  products: Product[];
  totalCount: number;
}

export interface IGetProductsCollRes {
  cartCount: number;
  favouritesCount: number;
  collectionName: string;
  products: Product[];
  totalCount: number;
}

export interface IGetProductsReq extends IFilter {
  SortType?: number;
}

export interface IGetProductDetReq {
  ProductId: string;
}
