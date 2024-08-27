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
  nomNumber: string;
  productType: string;
  // products?: any;
  unit: string;
  count?: number;
  attribute: Attribute[];
};

interface Attribute {
  id: number;
  product_id: number;
  key: string;
  value: string;
  created_at: string;
  updated_at?: string;
}

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


