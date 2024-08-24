"use client"
import React, { useEffect, useState } from 'react';
import AccountLayout from '@/components/my-account/account-layout';
import OrderDetails from '@/components/order/order-details';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { observer } from "mobx-react";
import NotFoundBlock from "@/components/NotFoundBlock";
import { useStore } from '@/hooks/useStore';

const OrderPage = observer(() => {

//   const ids = useRouter();
  
//   const Params = useParams();

// console.log(Params,'idsidsids')

  const [{ data }, setState] = useState<any>([]); //дата не всегда заполнялась , просто влязи стейт и засунули в него ответ с сервером

  const store = useStore();
  const authStore = store.auth;
  const searchParams = useSearchParams();



  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = Number(searchParams.get('order_id'));
        if (id) {
          const response = await authStore.dataGetOrderById({
            orderId: id,
          });
          setState(response as any);
        }
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchData();

  }, []);

  if (!authStore.isAuth) {
    return <NotFoundBlock />;
  }

  return (
    <AccountLayout>
      <OrderDetails orderi={data}/>
    </AccountLayout>
  );
})

export default OrderPage
