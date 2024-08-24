"use client"
import React, { useEffect, useState } from 'react';
import AccountLayout from '@/components/my-account/account-layout';
import OrderTable from '@/components/order/order-table';
import NotFoundBlock from "@/components/NotFoundBlock";
import { observer } from "mobx-react";
import { useStore } from '@/hooks/useStore';

const OrdersTablePage = observer(() => {
  const store = useStore();
  const authStore = store.auth;
  
  useEffect(() => {
    const fetchData = async () => {
      await authStore.getUserOrders({})
    };

    fetchData();

  }, []);
  
  const orders = authStore.ordersAll;


  console.log(authStore.orderTotalCount,'orderIdOPDER')

  
  if (!authStore.isAuth) {
    return <NotFoundBlock />;
  }

  return (
    <AccountLayout>
      {!authStore.isLoading ? (
        <OrderTable orders={orders} />
      ) : (
        <div>Loading...</div>
      )}
    </AccountLayout>
  );
});

export default OrdersTablePage