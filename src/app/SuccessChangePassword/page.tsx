"use client"

import React, {useEffect} from "react";
import Breadcrumb from '@/components/ui/breadcrumb';
import {observer} from "mobx-react";
import {useSearchParams} from 'next/navigation';
import { useStore } from "@/hooks/useStore";
import SuccsChangePass from "@/components/auth/succs-change-pass";

  const SuccessChangePassword: React.FC = observer(() => {


  return (
    <div className="flex justify-center items-center">
      <div className="py-12 sm:py-16 lg:py-20">
        <SuccsChangePass />
      </div>
    </div>
  );
})

export default SuccessChangePassword;