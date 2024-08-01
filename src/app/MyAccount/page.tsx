"use client"
import Breadcrumb from '@/components/ui/breadcrumb';
import AccountLayout from '@/components/my-account/account-layout';
import AccountDetails from '@/components/my-account/account-details';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// import { GetStaticProps } from 'next';
import { observer } from "mobx-react";
import NotFoundBlock from "@/components/NotFoundBlock";
import { useStore } from '@/hooks/useStore';

const AccountDetailsPage = observer(() => {
  const store = useStore();
  const authStore = store.auth;

  if (!authStore.isAuth) {
    return <NotFoundBlock />;
  }
  return (
    <>
      <Breadcrumb />
      <AccountLayout>
        <AccountDetails />
      </AccountLayout>
    </>
  );
});
export default AccountDetailsPage
