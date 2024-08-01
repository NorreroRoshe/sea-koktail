"use client"
import { IGetCollectionReq } from "../Collection/collection.dtos";
import { ICollection, IColFilter } from "../Collection/collection.types";

export interface ICollectionStore {
  collections: ICollection[];
  collection: ICollection;
  windowCollection: ICollection[];
  collectionfilters: IColFilter;
  isLoading: boolean;

  setFrom: (fromCollection: number) => void;
  setCount: (countCollection: number) => void;

  getCollections: (data: IGetCollectionReq) => void;
  getCollection: (data: IGetCollectionReq) => void;
  getWindowCollection: (data: IGetCollectionReq) => void;  
}