"use client"
import Divider from '@/components/ui/divider';
import LoginForm from '@/components/auth/login-form';
import { observer } from "mobx-react";

  const SignInPage = observer(() => {
  return (
    <>
      {/* <Divider /> */}
      <div className="flex justify-center items-center">
        {/* <Breadcrumb /> */}
        <div className="py-12 sm:py-16 lg:py-20">
          <LoginForm 
          // isPopup={false}
          className="border border-skin-base rounded-lg" />
        </div>
      </div>
      {/* <Divider /> */}
    </>
  );
})
export default SignInPage;