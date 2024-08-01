"use client"
import makeRequest from '@/api/makeRequest';
import { IGetBrandReq, IGetBrandRes, IGetBrandColReq, IGetBrandColRes } from '@/types/Brand/brand.dtos';
import { IBrand } from '@/types/Brand/brand.types';
// import {ProductsResponse} from "@/types/types";
import {AxiosResponse} from "axios";

class BrandService {

  getBrands({data} :
    {data: IGetBrandReq}) {
    return makeRequest<IGetBrandRes>({
      url: '/brand',
      method: 'GET',
      params: data,
    });
  };
  getBrandCol({data} :
    {data: IGetBrandColReq}) {
    return makeRequest<IGetBrandColRes>({
      url: `/brand/collections`,
      method: 'GET',
      params: data
    });
  };
  getWindowBrand({data} :
    {data: IGetBrandReq}) {
    return makeRequest<IGetBrandRes>({
      url: `/brand`,
      method: 'GET',
      params: {
        From: data.From,
        Count: 8,
      },
    });
  };
}

export default new BrandService();
