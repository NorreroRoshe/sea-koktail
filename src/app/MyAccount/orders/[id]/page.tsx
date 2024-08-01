"use client"
import AccountLayout from '@/components/my-account/account-layout';
import OrderDetails from '@/components/order/order-details';
import { observer } from "mobx-react";
import NotFoundBlock from "@/components/NotFoundBlock";
import { useStore } from '@/hooks/useStore';

const OrderPage = observer(() => {
  
    const store = useStore();
    const authStore = store.auth;
  
    if (!authStore.isAuth) {
      return <NotFoundBlock />;
    }
  return (
    <AccountLayout>
      <OrderDetails className="p-0" />
    </AccountLayout>
  );
})

export default OrderPage
