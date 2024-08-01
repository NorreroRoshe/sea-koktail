"use client"
import { IGetBrandReq, IGetBrandColReq } from '@/types/Brand/brand.dtos';
import { IBrand, IColFilter, IBrandCollection } from "../Brand/brand.types";

export interface IBrandStore {
  brands: IBrand[];
  brandCollection: IBrandCollection[];
  brandName: string;
  windwoBrand: IBrand[];
  brandfilters: IColFilter;
  isLoading: boolean;

  setFrom: (fromBrand: number) => void;
  setCount: (countBrand: number) => void;

  getBrands: (data: IGetBrandReq) => void;
  getBrandCol: (data: IGetBrandColReq) => void;
  getWindowBrand: (data: IGetBrandReq) => void;  
}