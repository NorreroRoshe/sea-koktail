"use client"
import React, { useEffect, useState } from 'react';
import AccountLayout from '@/components/my-account/account-layout';
import { useContactQuery } from '@/framework/basic-rest/contact/contact';
import ContactBox from '@/components/contact/contact-content';
import { observer } from "mobx-react";
import NotFoundBlock from "@/components/NotFoundBlock";
import { useStore } from '@/hooks/useStore';
const AccountContantPage = observer(() => {
  
    const store = useStore();
    const authStore = store.auth;
  

    useEffect(() => {
      authStore.getUserPhone();
  }, []);

    if (!authStore.isAuth) {
      return <NotFoundBlock />;
    }

  // let { data, isLoading } = useContactQuery();

  return (
    <>
      <AccountLayout>
        {!authStore.isLoading ? (
          <ContactBox items={authStore.phoneData} />
        ) : (
          <div>Loading...</div>
        )}
      </AccountLayout>
    </>
  );
})

export default AccountContantPage;