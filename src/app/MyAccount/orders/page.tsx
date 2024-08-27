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
      await authStore.getUserOrders({orderCount: 100})
    };

    fetchData();

  }, []);
  
  const orders = authStore.ordersAll;


  console.log(authStore.ordersAll,'orderIdOPDER')

  
  if (!authStore.isAuth) {
    return <NotFoundBlock />;
  }

  return (
    <AccountLayout>
      {!authStore.isLoading ? (
        <>
          <OrderTable orders={orders} />
          
          <p className="font-semibold text-sm md:text-xl text-skin-base mb-4 md:mb-0">
            Ваша скидка состовляет: {authStore?.salePercent}
            <br/>
            Сумма покупки за все время: {authStore?.allOrdersTotalCost} ₽
          </p>
            <br/>
            <br/>
          <h2 className="font-semibold text-sm md:text-xl text-skin-base mb-4 md:mb-0">
            *****Система скидок*****
          </h2>

          <p className="font-semibold text-sm md:text-xl text-skin-base mb-4 md:mb-0">
            3% накопительные балы с любой суммы (при регистрации)
            <br/>
            5%, при покупке свыше 10тыс.
            <br/>
            7% при покупке свыше 25тыс
            <br/>
            10% при покупке от 100тыс.
          </p>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </AccountLayout>
  );
});

export default OrdersTablePage