// "use client"
// import { useUI } from '@/contexts/ui.context';
// import { useStore } from '@/hooks/useStore';
// // import Router from 'next/navigation';
// import { useMutation } from 'react-query';
// import { useRouter } from "next/navigation";

// export interface LoginInputType {
//   email: string;
//   password: string;
//   remember_me: boolean;
// }

// async function logout() {
//   return {
//     ok: true,
//     message: 'Logout Successful!',
//   };
// }

// export const useLogoutMutation = () => {
//   const router = useRouter();

//   const store = useStore();
//   const authStore = store.auth;


//   return useMutation(() => logout(), {
//     onSuccess: (_data) => {
//       authStore.signOut();
//       // Устанавливаем таймаут на 1 секунду перед переходом
//       setTimeout(() => {
//         router.push('/');
//       }, 1000); // 1000 миллисекунд = 1 секунда
//     },
//     onError: (data) => {
//       // Обработка ошибок
//     },
//   });
// };


import { useUI } from '@/contexts/ui.context';
import { useStore } from '@/hooks/useStore';
import { useMutation } from 'react-query';
import { useRouter } from "next/navigation";

export interface LoginInputType {
  email: string;
  password: string;
  remember_me: boolean;
}

async function logout() {
  return {
    ok: true,
    message: 'Logout Successful!',
  };
}

export const useLogoutMutation = () => {
  const router = useRouter();
  const store = useStore();
  const authStore = store.auth;

  return useMutation(() => logout(), {
    onSuccess: (_data) => {
      authStore.signOut();
      router.push('/'); // Сначала перенаправляем пользователя на главную страницу
      setTimeout(() => {
        window.location.reload(); // Затем перезагружаем страницу
      }, 1000); // Небольшая задержка для обеспечения выполнения перенаправления
    },
    onError: (data) => {
      // Обработка ошибок
    },
  });
};