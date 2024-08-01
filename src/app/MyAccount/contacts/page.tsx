"use client"
import AccountLayout from '@/components/my-account/account-layout';
import { useContactQuery } from '@/framework/basic-rest/contact/contact';
import ContactBox from '@/components/contact/contact-content';
import { observer } from "mobx-react";
import NotFoundBlock from "@/components/NotFoundBlock";
import { useStore } from '@/hooks/useStore';
const AccountContantPage = observer(() => {
  
    const store = useStore();
    const authStore = store.auth;
  
    if (!authStore.isAuth) {
      return <NotFoundBlock />;
    }
  let { data, isLoading } = useContactQuery();

  return (
    <>
      <AccountLayout>
        {!isLoading ? (
          <ContactBox items={data} />
        ) : (
          <div>Loading...</div>
        )}
      </AccountLayout>
    </>
  );
})

export default AccountContantPage;