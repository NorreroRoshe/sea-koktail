"use client"
import ProductService from '@/api/Product/ProductService';
import { IFilter } from '@/types/Product/filter.types';
import { IGetProductDetReq, IGetProductsReq } from '@/types/Product/product.dtos';
import { Product } from '@/types/Product/product.types';
import { IProductStore } from '@/types/Stores/IProductStore';
import { makeAutoObservable } from 'mobx';

export class ProductStore implements IProductStore {
  items: Product[] = [];
  detItem: Product = {} as Product;
  collectionItems: Product[] = [];
  collectionName: string = '';
  brandItems: Product[] = [];
  cartCount: number = 0;
  favouritesCount: number = 0;
  totalCount: number = 0;
  searchedString: string = "";
  searchProduct: Product[] = [];
  searchPageProduct: Product[] = [];
  filters: IFilter = {
    ProductTypes: []
  };
  sort: number = 0;
  isLoading: boolean = false;


  constructor() {
    makeAutoObservable(this);
  }

  setProductTypes(dataValue: number) {
    const value = dataValue + 1;
    const array = Array.isArray(this.filters.ProductTypes) ? this.filters.ProductTypes : [];
    const ind = array.findIndex((type) => type === value);
    this.filters.ProductTypes =
      ind === -1 //Здесь мы сравниваем , есть ли он или нет
        ? [...array, value] //Здесь мы добавляем
        : [...array?.slice(0, ind), ...array?.slice(ind + 1, array.length)]; //Здесь мы удаляем
  };
  setArrayProductTypes(newProductTypes: number[]) {
    this.filters.ProductTypes = newProductTypes;
  };

  setCategories(dataValue: number) {
    const value = dataValue + 1;
    const array = Array.isArray(this.filters.Categories) ? this.filters.Categories : [];
    const ind = array.findIndex((type) => type === value);
    this.filters.Categories =
      ind === -1 //Здесь мы сравниваем , есть ли он или нет
        ? [...array, value] //Здесь мы добавляем
        : [...array?.slice(0, ind), ...array?.slice(ind + 1, array.length)]; //Здесь мы удаляем
  };
  setArrayCategories(newCategories: number[]) {
    this.filters.Categories = newCategories;
  };

  setStyles(dataValue: number) {
    const value = dataValue + 1;
    const array = Array.isArray(this.filters.Styles) ? this.filters.Styles : [];
    const ind = array.findIndex((type) => type === value);
    this.filters.Styles =
      ind === -1 //Здесь мы сравниваем , есть ли он или нет
        ? [...array, value] //Здесь мы добавляем
        : [...array?.slice(0, ind), ...array?.slice(ind + 1, array.length)]; //Здесь мы удаляем
  };

  setArrayStyles(newStyles: number[]) {
    this.filters.Styles = newStyles;
  };

  setAdditionalParams(dataValue: number) {
    const value = dataValue + 1;
    const array = Array.isArray(this.filters.AdditionalParams) ? this.filters.AdditionalParams : [];
    const ind = array.findIndex((type) => type === value);
    this.filters.AdditionalParams =
      ind === -1 //Здесь мы сравниваем , есть ли он или нет
        ? [...array, value] //Здесь мы добавляем
        : [...array?.slice(0, ind), ...array?.slice(ind + 1, array.length)]; //Здесь мы удаляем
  };
  setArrayAdditionalParams(newAdditionalParams: number[]) {
    this.filters.AdditionalParams = newAdditionalParams;
  };



  setColors(dataValue: number) {
    const value = dataValue + 1;
    const array = Array.isArray(this.filters.Colors) ? this.filters.Colors : [];
    const ind = array.findIndex((type) => type === value);
    this.filters.Colors =
      ind === -1 //Здесь мы сравниваем , есть ли он или нет
        ? [...array, value] //Здесь мы добавляем
        : [...array?.slice(0, ind), ...array?.slice(ind + 1, array.length)]; //Здесь мы удаляем
  };
  setArrayColors(newColors: number[]) {
    this.filters.Colors = newColors;
  };


  setMaterials(dataValue: number) {
    const value = dataValue + 1;
    const array = Array.isArray(this.filters.Materials) ? this.filters.Materials : [];
    const ind = array.findIndex((type) => type === value);
    this.filters.Materials =
      ind === -1 //Здесь мы сравниваем , есть ли он или нет
        ? [...array, value] //Здесь мы добавляем
        : [...array?.slice(0, ind), ...array?.slice(ind + 1, array.length)]; //Здесь мы удаляем
  };
  setArrayMaterials(newMaterials: number[]) {
    this.filters.Materials = newMaterials;
  };

  setPictureMaterial(dataValue: number) {
    const value = dataValue + 1;
    const array = Array.isArray(this.filters.PictureMaterial) ? this.filters.PictureMaterial : [];
    const ind = array.findIndex((type) => type === value);
    this.filters.PictureMaterial =
      ind === -1 //Здесь мы сравниваем , есть ли он или нет
        ? [...array, value] //Здесь мы добавляем
        : [...array?.slice(0, ind), ...array?.slice(ind + 1, array.length)]; //Здесь мы удаляем
  };
  setArrayPictureMaterial(newPictureMaterial: number[]) {
    this.filters.PictureMaterial = newPictureMaterial;
  };

  setChandelierTypes(dataValue: number) {
    const value = dataValue + 1;
    const array = Array.isArray(this.filters.ChandelierTypes) ? this.filters.ChandelierTypes : [];
    const ind = array.findIndex((type) => type === value);
    this.filters.ChandelierTypes =
      ind === -1 //Здесь мы сравниваем , есть ли он или нет
        ? [...array, value] //Здесь мы добавляем
        : [...array?.slice(0, ind), ...array?.slice(ind + 1, array.length)]; //Здесь мы удаляем
  };
  setArrayChandelierTypes(newChandelierTypes: number[]) {
    this.filters.ChandelierTypes = newChandelierTypes;
  };

  setCount(countProduct: number){
    this.filters.Count = countProduct;
  }

  setFrom(fromProduct: number) {
    this.filters.From = fromProduct;
  };
  setPage(pageProduct: number) {
    this.filters.Page = pageProduct;
  };
  setSearchName(searchName: string) {
    this.filters.SearchQuery = searchName;
  };
  setIsSale(isSale: boolean) {
    this.filters.IsSale = isSale;
  };
  setSort(sortProduct: number) {
    this.sort = sortProduct;
  };
  
  setPrice(minPrice: number, maxPrice: number ) {
    this.filters.MinPrice = minPrice;
    this.filters.MaxPrice = maxPrice;
  };

  setDiameter(minDiameter: number, maxDiameter: number ) {
    this.filters.MinDiameter = minDiameter;
    this.filters.MaxDiameter = maxDiameter;
  };
  
  setHeight(minHeight: number, maxHeight: number ) {
    this.filters.MinHeight = minHeight;
    this.filters.MaxHeight = maxHeight;
  };
  setLength(minLength: number, maxLength: number ) {
    this.filters.MinLength = minLength;
    this.filters.MaxLength = maxLength;
  };
  setWidth(minWidth: number, maxWidth: number ) {
    this.filters.MinWidth = minWidth;
    this.filters.MaxWidth = maxWidth;
  };
  setIndent(minIndent: number, maxIndent: number ) {
    this.filters.MinIndent = minIndent;
    this.filters.MaxIndent = maxIndent;
  };
  setLampCount(minLampCount: number, maxLampCount: number ) {
    this.filters.MinLampCount = minLampCount;
    this.filters.MaxLampCount = maxLampCount;
  };

  clearFilters() {
    this.filters = {};
    this.filters.MaxPrice = 250000;
    this.filters.MinPrice = 0;
    
    this.filters.MaxWidth = 1500;
    this.filters.MinWidth = 0;

    this.filters.MaxHeight = 2000;
    this.filters.MinHeight = 0;
    
    this.filters.MaxLength = 2000;
    this.filters.MinLength = 0;
    
    this.filters.MaxIndent = 1500;
    this.filters.MinIndent = 0;

    this.filters.MaxLampCount = 20;
    this.filters.MinLampCount = 0;

    this.filters.MinDiameter = 0;
    this.filters.MaxDiameter = 2000;
  };

  async getProducts(Count: number, From?: number, data?: IGetProductsReq) {
    this.isLoading = true;
    const response = await ProductService.getProducts({ Count, From,  data });

    if ('data' in response) {
      this.isLoading = false;
      this.cartCount = response?.data?.cartCount ?? 0;
      this.items = response.data?.products ?? [];
      this.favouritesCount = response?.data?.favouritesCount ?? 0;
      this.totalCount = response?.data?.totalCount ?? 0;
    }
    return response;
  };

  async getSearchProducts(
     data: IFilter) {
    this.isLoading = true;
    const response = await ProductService.getSearchProducts({ data });

    if ('data' in response) {
      this.isLoading = false;
      this.cartCount = response?.data?.cartCount ?? 0;
        this.favouritesCount = response?.data?.favouritesCount ?? 0;
        this.totalCount = response?.data?.totalCount ?? 0;

        if (data.Count === 3) {
          this.searchProduct = response?.data?.products?.slice(0, 3) ?? [];
        } else {
          this.searchPageProduct = response?.data?.products ?? [];
          this.searchedString = data.SearchQuery || "";
        }
    }
    return response;
  };

  async getCollectionProducts(data: IFilter) {
    this.isLoading = true;
    const response = await ProductService.getCollectionProducts({ data });

    if ('data' in response) {
      this.isLoading = false;
      this.cartCount = response?.data?.cartCount ?? 0;
      this.collectionItems = response?.data?.products ?? [];
      this.collectionName = response?.data?.collectionName ?? '';
      this.favouritesCount = response?.data?.favouritesCount ?? 0;
      this.totalCount = response?.data?.totalCount ?? 0;
    }
  };

  async getBrandProducts(data: IFilter) {
    this.isLoading = true;
    const response = await ProductService.getBrandProducts({ data });

    if ('data' in response) {
      this.isLoading = false;
      this.cartCount = response?.data?.cartCount ?? 0;
      this.brandItems = response?.data?.products ?? [];
      this.favouritesCount = response?.data?.favouritesCount ?? 0;
      this.totalCount = response?.data?.totalCount ?? 0;
    }
  };


  async getDetProduct(data: IGetProductDetReq) {
    this.isLoading = true;
    const response = await ProductService.getDetProduct({ data });

    if ('data' in response) {
      this.isLoading = false;
      this.detItem = response.data
    }

    return response;
  };

  // async createProduct(data: Product) {
  //   this.isLoading = true;
  //   const response = await ProductService.createProduct({ data });

  //   if ('data' in response) {
  //     this.isLoading = false;
  //     this.items = [...this.items, response.data];
  //     this.totalCount = this.totalCount + 1;
  //   }
  // };
}