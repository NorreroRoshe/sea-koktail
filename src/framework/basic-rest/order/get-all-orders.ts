"use client"
import { QueryOptionsType, Order } from '@/framework/basic-rest/types';
import http from '@/framework/basic-rest/utils/http';
import { API_ENDPOINTS } from '@/framework/basic-rest/utils/api-endpoints';
import { useQuery } from 'react-query';

const fetchOrders = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.ORDERS);
  return {
    data: data,
  };
};

const useOrdersQuery = (options: QueryOptionsType) => {
  return useQuery([API_ENDPOINTS.ORDERS, options], fetchOrders);
};

export { useOrdersQuery, fetchOrders };
