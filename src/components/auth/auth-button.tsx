'use client'

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ROUTES } from "@/utils/routes";
import cn from 'classnames';
import { useModalAction } from "@/components/common/modal/modal.context";
import { useStore } from "@/hooks/useStore";
const AuthMenu = dynamic(() => import("@/components/layouts/Header/AuthMenu"), { ssr: false });
import { observer } from "mobx-react";
import Cookies from 'js-cookie';

type AuthButtonProps = {
  className?: string;
  iconClassName?: string;
  hideLabel?: boolean;
  isShowing?: boolean;
};

const AuthButton: React.FC<AuthButtonProps> = observer(({ className }) => {
  const store = useStore();
  const authStore = store.auth

  const [{ data: prodata }, setState] = useState<any>({});
  const { openModal } = useModalAction();
  function handleLogin() {
    openModal("LOGIN_VIEW");
  }

    
  const isLocalAuth = !!Cookies.get("refresh_token");
      

  useEffect(() => {
    const fetchData = async () => {
      authStore.userId;
      try {
        const id = authStore.userId; // Получить `UserId`
        if (id) {
          const response = await authStore.getUserDetails({
            UserId: id,
          });
          setState(response as any);
        }
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    fetchData();
  }, [authStore.userId]);

  return (
    <button
      className={cn(
        'flex items-center justify-center flex-shrink-0 h-auto focus:outline-none transform',
        className,
      )}
      style={{ display: 'flex', zIndex: 1, marginRight: '-7px' }}>
      <div
        className="hidden lg:flex items-center flex-shrink-0 custom-dn"
        style={{display: "flex", padding: '7px 8px 9px', background: '#fff', borderRadius: '50%'}}>
        <AuthMenu
          isAuthorized={authStore.isAuth}
          href={ROUTES.ACCOUNT}
          btnProps={{
            children: "",
            onClick: handleLogin,
          }}>
          {/* {prodata?.email} */}
        </AuthMenu>
      </div>
    </button>
  );
});

export default AuthButton;
