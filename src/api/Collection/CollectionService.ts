"use client"
import makeRequest from '@/api/makeRequest';
import { IGetCollectionReq, IGetCollectionRes } from '@/types/Collection/collection.dtos';
import { ICollection } from '@/types/Collection/collection.types';
// import {ProductsResponse} from "@/types/types";
import {AxiosResponse} from "axios";

class CollectionService {

  getCollections({data} :
    {data: IGetCollectionReq}) {
    return makeRequest<IGetCollectionRes>({
      url: '/collection',
      method: 'GET',
      params: data,
    });
  };
  getCollection({data} :
    {data: IGetCollectionReq}) {
    return makeRequest<ICollection>({
      url: `/collection/details/${data.name}`,
      method: 'GET',
    });
  };
  getWindowCollection({data} :
    {data: IGetCollectionReq}) {
    return makeRequest<ICollection>({
      url: `/collection`,
      method: 'GET',
      params: {
        From: data.From,
        Count: 8,
      },
    });
  };
}

export default new CollectionService();
