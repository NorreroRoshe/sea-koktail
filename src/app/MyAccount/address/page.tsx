"use client"
import React, { useEffect } from 'react';
import AccountLayout from '@/components/my-account/account-layout';
import AddressGrid from '@/components/address/address-grid';
import { observer } from "mobx-react";
import NotFoundBlock from "@/components/NotFoundBlock";
import { useStore } from '@/hooks/useStore';

const AccountDetailsPage = observer(() => {
  const store = useStore();
  const authStore = store.auth;

  useEffect(() => {
    authStore.getUserAddress();
}, []);

  if (!authStore.isAuth) {
    return <NotFoundBlock />;
  }
  
  return (
    <>
      <AccountLayout>
        {!authStore.isLoading ? (
          <AddressGrid address={authStore?.addressData} />
        ) : (
          <div>Loading...</div>
        )}
      </AccountLayout>
    </>
  );
})

export default AccountDetailsPage;