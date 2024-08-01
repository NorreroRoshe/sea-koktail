"use client"
import { IFilter } from "./filter.types";

export type Product = {
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
  BrandId?: string;
  collection?: ICollection;
  brand?: IBrand;
  urls: string[];
  files: IFileUrl[];
  // products?: any;
  count?: number;
};






export interface IFileUrl {
  name: string;
  url: string;
}


export interface ICollection {
  id: string;
  name: string;
}

export interface IBrand {
  id: string;
  name: string;
}


export interface IProductSliceState {
  items: Product[];
  cartCount: number;
  favouritesCount: number;
  totalCount: number;
  filters: IFilter;
  searchProduct: Product[];
  searchPageProduct: Product[];
  searchedString: string;
  sort: number;
}