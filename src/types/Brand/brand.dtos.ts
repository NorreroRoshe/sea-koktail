"use client"
import { IBrand, IBrandCollection } from "./brand.types";

export interface IGetBrandRes {
  brands: IBrand[];
}

export interface IGetBrandColRes {
  collections?: IBrandCollection[];
  brandName?: string;
}

export interface IGetBrandReq {
  name?: string;
  From?: number;
  Count?: number;
}

export interface IGetBrandColReq {
  From?: number;
  Count?: number;
  BrandId?: string;
}