"use client"

import { useQuery } from 'react-query';
import http from '../utils/http';
import { API_ENDPOINTS } from '../utils/api-endpoints';
import { Product, QueryOptionsType } from '../types';

export const fetchSearchedProducts = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.SEARCH);
  return data;
};
export const useSearchQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>(
    [API_ENDPOINTS.SEARCH, options],
    fetchSearchedProducts
  );
};
