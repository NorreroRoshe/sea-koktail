"use client"
import AccountLayout from '@/components/my-account/account-layout';
import AddressGrid from '@/components/address/address-grid';
import { useAddressQuery } from '@/framework/basic-rest/address/address';
import { observer } from "mobx-react";
import NotFoundBlock from "@/components/NotFoundBlock";
import { useStore } from '@/hooks/useStore';

const AccountDetailsPage = observer(() => {
  const store = useStore();
  const authStore = store.auth;

  if (!authStore.isAuth) {
    return <NotFoundBlock />;
  }
  let { data, isLoading } = useAddressQuery();
  return (
    <>
      <AccountLayout>
        {!isLoading ? (
          <AddressGrid address={data?.data} />
        ) : (
          <div>Loading...</div>
        )}
      </AccountLayout>
    </>
  );
})

export default AccountDetailsPage;