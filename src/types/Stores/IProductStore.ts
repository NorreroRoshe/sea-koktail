"use client"
import { APIError } from "@/api/makeRequest";
import { IFilter } from "../Product/filter.types";
import { IGetProductDetReq, IGetProductsReq, IGetProductsRes } from "../Product/product.dtos";
import { Product } from "../Product/product.types";
import { AxiosResponse } from "axios";

export interface IProductStore {
  items: Product[];
  detItem: Product;
  collectionItems: Product[];
  collectionName: string;
  brandItems: Product[];
  cartCount: number;
  favouritesCount: number;
  totalCount: number;
  filters: IFilter;
  searchProduct: Product[];
  searchPageProduct: Product[];
  searchedString: string;
  sort: number;
  isLoading: boolean;


  setProductTypes: (dataValue: number) => void;
  setArrayProductTypes: (newProductTypes: number[]) => void;
  setCategories: (dataValue: number) => void;
  setArrayCategories: (newCategories: number[]) => void;
  setStyles: (dataValue: number) => void;
  setArrayStyles: (newStyles: number[]) => void;
  setAdditionalParams: (dataValue: number) => void;
  setArrayAdditionalParams: (newAdditionalParams: number[]) => void;
  setColors: (dataValue: number) => void;
  setArrayColors: (newColors: number[]) => void;
  setMaterials: (dataValue: number) => void;
  setArrayMaterials: (newMaterials: number[]) => void;
  setPictureMaterial: (dataValue: number) => void;
  setArrayPictureMaterial: (newPictureMaterial: number[]) => void;
  setChandelierTypes: (dataValue: number) => void;
  setArrayChandelierTypes: (newChandelierTypes: number[]) => void;
  
  setCount: (countProduct: number) => void;
  setFrom: (fromProduct: number) => void;
  setPage: (pageProduct: number) => void;
  setSearchName: (searchName: string) => void;
  setIsSale: (isSale: boolean) => void;
  setSort: (sortProduct: number) => void;

  
  setPrice: (minPrice: number, maxPrice: number) => void;
  setDiameter: (minDiameter: number, maxDiameter: number) => void;
  setHeight: (minHeight: number, maxHeight: number) => void;
  setLength: (minLength: number, maxLength: number) => void;
  setWidth: (minWidth: number, maxWidth: number) => void;
  setIndent: (minIndent: number, maxIndent: number) => void;
  setLampCount: (minLampCount: number, maxLampCount: number) => void;
  clearFilters: () => void;
  getProducts: (Count: number, From?: number, data?: IGetProductsReq) => Promise<APIError | AxiosResponse<IGetProductsRes, any>>;
  getSearchProducts: (data: IFilter) => Promise<APIError | AxiosResponse<IGetProductsRes, any>>;
  getCollectionProducts: (data: IFilter) => void;
  getBrandProducts: (data: IFilter) => void;
  getDetProduct: (data: IGetProductDetReq) => Promise<APIError | AxiosResponse<Product, any>>;
  // createProduct: (data: Product) => void;
}