'use client'
import React, { useEffect, useState } from 'react';
import { useAddressQuery } from '@/framework/basic-rest/address/address';
import AddressGrid from '@/components/address/address-grid';
import { useStore } from '@/hooks/useStore';
import {observer} from "mobx-react";

const AddressPage: React.FC = observer(() => {
  // let { data, isLoading } = useAddressQuery();



  const store = useStore();
  const userStore = store.auth;

  useEffect(() => {
      userStore.getUserAddress();
      // userStore.getOrderTimes();
      
      // console.log(userStore.orderTimes[0],'addressData')
  }, []);

  return !userStore.isLoading ? (
    <AddressGrid 
    // address={data?.data} 
    address={userStore?.addressData} 
    />
  ) : (
    <div>Loading...</div>
  );
});

export default AddressPage;