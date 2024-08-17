'use client'
import React, { useEffect, useState } from 'react';
import { useContactQuery } from '@/framework/basic-rest/contact/contact';
import ContactBox from './contact-content';
import {observer} from "mobx-react";
import { useStore } from '@/hooks/useStore';

const ContactPage: React.FC = observer(() => {
  // let { data, isLoading } = useContactQuery();
  const store = useStore();
  const userStore = store.auth;

  useEffect(() => {
      userStore.getUserPhone();
      console.log(userStore.addressData,'addressData')
  }, []);

  return !userStore.isLoading ? (
    <div className="w-full max-w-[1300px] mx-auto">
      <div className="flex flex-wrap">
        <div className="w-full">
          <ContactBox items={userStore?.phoneData} />
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
});

export default ContactPage;
