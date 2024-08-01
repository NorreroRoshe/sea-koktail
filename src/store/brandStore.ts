"use client"
import BrandService from '@/api/Brand/BrandService';
import { IGetBrandReq, IGetBrandColReq } from '@/types/Brand/brand.dtos';
import { IBrand, IColFilter, IBrandCollection } from '@/types/Brand/brand.types';
import { IBrandStore } from '@/types/Stores/IBrandStore';
import { makeAutoObservable } from 'mobx';

export class BrandStore implements IBrandStore {
  brands: IBrand[] = [];
  brandCollection: IBrandCollection[] = [];
  brandName: string = '';
  windwoBrand: IBrand[] = [];
  brandfilters: IColFilter = {From: 0, Count: 0};
  isLoading: boolean = false;
  //@ts-ignore

  constructor() {
    makeAutoObservable(this);
  }

  setFrom(fromBrand: number){
    this.brandfilters.From = fromBrand;
  }
  setCount(countBrand: number){
    this.brandfilters.Count = countBrand;
  }




  async getBrands(data: IGetBrandReq) { 
    this.isLoading = true;
    const response = await BrandService.getBrands({data})
    if ('data' in response) {
      this.isLoading = false;
      this.brands = response.data.brands
    }
  }
  async getBrandCol(data: IGetBrandColReq) { 
    this.isLoading = true;
    const response = await BrandService.getBrandCol({data})
    if ('data' in response) {
      this.isLoading = false;
      this.brandCollection = response.data.collections ?? [];
      this.brandName = response.data.brandName ?? ''
    }
  }
  async getWindowBrand(data: IGetBrandReq) { 
    this.isLoading = true;
    const response = await BrandService.getWindowBrand({data})
    if ('data' in response) {
      this.isLoading = false;
      this.brands = response.data.brands
    }
  }
}
