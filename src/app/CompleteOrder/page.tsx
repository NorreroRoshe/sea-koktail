'use client'
import Container from '@/components/ui/container';
import OrderInformation from '@/components/order/order-information';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import Divider from '@/components/ui/divider';
import { useEffect } from 'react';
import { useCart } from '@/contexts/cart/cart.context';
import {observer} from "mobx-react";
import NotFoundBlock from "@/components/NotFoundBlock";
import { useStore } from '@/hooks/useStore';

const Order = observer(() => {
  const store = useStore();
  const authStore = store.auth;

  if (!authStore.isAuth) {
    return <NotFoundBlock />;
  }
  return (
    <>
      <Divider />
      <Container>
        <OrderInformation />
      </Container>
      <Divider />
    </>
  );
})

export default Order;