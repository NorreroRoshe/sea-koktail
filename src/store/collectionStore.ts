"use client"
import CollectionService from '@/api/Collection/CollectionService';
import { IGetCollectionReq } from '@/types/Collection/collection.dtos';
import { ICollection, IColFilter } from '@/types/Collection/collection.types';
import { ICollectionStore } from '@/types/Stores/ICollectionStore';
import { makeAutoObservable } from 'mobx';

export class CollectionStore implements ICollectionStore {
  collections: ICollection[] = [];
  //@ts-ignore
  collection: ICollection;
  windowCollection: ICollection[] = [];
  collectionfilters: IColFilter = { From: 0, Count: 0 };
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setFrom(fromCollection: number) {
    this.collectionfilters.From = fromCollection;
  }
  setCount(countCollection: number) {
    this.collectionfilters.Count = countCollection;
  }




  async getCollections(data: IGetCollectionReq) {
    this.isLoading = true;
    const response = await CollectionService.getCollections({ data })
    if ('data' in response) {
      this.isLoading = false;
      this.collections = response.data.collections
    }
  }


  async getCollection(data: IGetCollectionReq) {
    this.isLoading = true;
    const response = await CollectionService.getCollection({ data });
    if ('data' in response) {
      this.isLoading = false;
      this.collection = response.data;

      // Проверяем, есть ли коллекция в массиве collections
      const colId = this.collections.findIndex((col) => this.collection.id === col.id);
      if (colId === -1) {
        // Если нет, добавляем коллекцию в массив
        this.collections.push(this.collection);
      }
    }
  }
  

  async getWindowCollection(data: IGetCollectionReq) {
    this.isLoading = true;
    const response = await CollectionService.getWindowCollection({ data })
    if ('data' in response) {
      this.isLoading = false;
      this.collections = response.data.collections
    }
  }
}