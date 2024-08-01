"use client"
import React from 'react';
import AccountLayout from '@/components/my-account/account-layout';
import OrderTable from '@/components/order/order-table';
import NotFoundBlock from "@/components/NotFoundBlock";
import { useOrdersQuery } from '@/framework/basic-rest/order/get-all-orders';
import { observer } from "mobx-react";
import { useStore } from '@/hooks/useStore';

const OrdersTablePage = observer(() => {
  const { data, isLoading } = useOrdersQuery({});
  const store = useStore();
  const authStore = store.auth;

  if (!authStore.isAuth) {
    return <NotFoundBlock />;
  }

  return (
    <AccountLayout>
      {!isLoading ? (
        <OrderTable orders={data?.data} />
      ) : (
        <div>Loading...</div>
      )}
    </AccountLayout>
  );
});

export default OrdersTablePage