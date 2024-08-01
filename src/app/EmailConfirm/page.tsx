// "use client"

// import React, {useEffect} from "react";
// import AfterVerification from "@/components/auth/after-login-verification";
// import Breadcrumb from '@/components/ui/breadcrumb';
// import {observer} from "mobx-react";
// import {useSearchParams} from 'next/navigation';
// import { useStore } from "@/hooks/useStore";

//   const EmailConfirm: React.FC = observer(() => {
    
//   const store = useStore();
//   const authStore = store.auth;

//   const params = useSearchParams()

  



//   useEffect(() => {
//     const email = params.get('email')
//     const code = params.get('code')
//     if(email && code) {
//       const response = authStore.emailConfirm({email, code})
//       console.log(response,'response')
//     }
//   },[])


  


//   return (
//     <div className="flex justify-center items-center">
//       <div className="py-12 sm:py-16 lg:py-20">
//         <AfterVerification />
//       </div>
//     </div>
//   );
// })

// export default EmailConfirm;



"use client"

import React, { useEffect, useState } from "react";
import AfterVerification from "@/components/auth/after-login-verification";
import { observer } from "mobx-react";
import { useSearchParams } from 'next/navigation';
import { useStore } from "@/hooks/useStore";

const EmailConfirm: React.FC = observer(() => {
  const store = useStore();
  const authStore = store.auth;
  const params = useSearchParams();

  const [renderContent, setRenderContent] = useState<React.ReactNode>(
    <div className="flex justify-center items-center" style={{height: '46vw'}}>
      <div className="py-12 sm:py-16 lg:py-20">
        Идет процесс верификации!
      </div>
    </div>
  );

  useEffect(() => {
    const email = params.get('email');
    const code = params.get('code');

    if (email && code) {
      authStore.emailConfirm({ email, code })
        .then((data) => {
          if (data?.data?.message === "Запрос выполнен успешно") {
            setRenderContent(
              <div className="flex justify-center items-center">
                <div className="py-12 sm:py-16 lg:py-20">
                  <AfterVerification />
                </div>
              </div>
            );
          } else if (data?.message === "Неправильный код подтверждения") {
            setRenderContent(
              <div className="flex justify-center items-center" style={{height: '46vw'}}>
                <div className="py-12 sm:py-16 lg:py-20">
                  Что-то пошло не по плану! Пожалуйста попробуйте выполнить операцию снова, либо свяжитесь с администрацией сайта!
                </div>
              </div>
            );
          } else if (data?.message === "Пользователь не найден") {
            setRenderContent(
              <div className="flex justify-center items-center" style={{height: '46vw'}}>
                <div className="py-12 sm:py-16 lg:py-20">
                  Что-то пошло не по плану! Пожалуйста попробуйте выполнить операцию снова, либо свяжитесь с администрацией сайта!
                </div>
              </div>
            );
          } else {
            setRenderContent(
              <div className="flex justify-center items-center" style={{height: '46vw'}}>
                <div className="py-12 sm:py-16 lg:py-20">
                  Идет процесс верификации!
                </div>
              </div>
            );
          }
        });
    }
  }, [authStore, params]);

  return renderContent;
});

export default EmailConfirm;
