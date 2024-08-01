"use client"

import React, {useEffect} from "react";
import AfterPassConf from "@/components/auth/after-pass-conf";
import Breadcrumb from '@/components/ui/breadcrumb';
import {observer} from "mobx-react";

const PasswordResets: React.FC = observer(() => {

  return (
    <div className="flex justify-center items-center">
      <div className="py-12 sm:py-16 lg:py-20">
        <AfterPassConf />
      </div>
    </div>
  );
})

export default PasswordResets;
