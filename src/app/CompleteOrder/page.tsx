'use client'
import Container from '@/components/ui/container';
import OrderInformation from '@/components/order/order-information';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import Divider from '@/components/ui/divider';
import { useEffect } from 'react';
import { useCart } from '@/contexts/cart/cart.context';

export default function Order() {
  return (
    <>
      <Divider />
      <Container>
        <OrderInformation />
      </Container>
      <Divider />
    </>
  );
}
