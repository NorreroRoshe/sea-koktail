"use client"

import React, {useEffect} from "react";
import Breadcrumb from '@/components/ui/breadcrumb';
import {observer} from "mobx-react";
import dynamic from 'next/dynamic';
const PasswordReset = dynamic(() => import('@/components/auth/password-reset'));

  const NewPassword: React.FC = observer(() => {
    
  return (
    <div className="flex justify-center items-center">
      <div className="py-12 sm:py-16 lg:py-20">
        <PasswordReset/>
      </div>
    </div>
  );
})

export default NewPassword;