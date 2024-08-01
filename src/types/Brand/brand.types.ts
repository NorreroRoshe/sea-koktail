"use client"



export type IBrand = {
  id: string;
  name: string;
  file: {
    name: string;
    url: string;
  };
};

export type IBrandCollection = {
  brandId?: any;
  id?: string;
  name?: string;
  preview?: string;
};

export interface IBrandSliceState {
  brand: IBrand[];
  windwoBrand: IBrand[];
  brandfilters: IColFilter;
}

export interface IColFilter {
  From?: number;
  Count?: number;
}