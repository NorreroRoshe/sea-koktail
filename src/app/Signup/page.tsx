"use client"

import SignupForm from '@/components/auth/sign-up-form';
import Divider from '@/components/ui/divider';
import { ModalProvider } from '@/components/common/modal/modal.context';
import Breadcrumb from '@/components/ui/breadcrumb';
import { observer } from "mobx-react";

const SignUpPage = observer(() => {
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="py-16 lg:py-20">
          <SignupForm 
          // isPopup={false} 
          className="border border-skin-base rounded-lg" />
        </div>
      </div>
    </>
  );
})

export default SignUpPage;