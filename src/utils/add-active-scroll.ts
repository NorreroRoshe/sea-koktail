// "use client"
// import { useEffect, RefObject } from 'react';

// export function addActiveScroll<T extends HTMLElement = HTMLElement>(
//   ref: RefObject<T>,
//   topOffset: number = 80
// ) {
//   useEffect(() => {
//     const element = ref?.current;
//     const listener = () => {
//       if (window.scrollY > topOffset) {
//         element?.classList.add('is-scrolling');
//       } else {
//         element?.classList.remove('is-scrolling');
//       }
//     };
//     document.addEventListener('scroll', listener);
//     return () => {
//       document.removeEventListener('scroll', listener);
//     };
//   }, []);
// }


"use client"
import { useEffect, RefObject } from 'react';

export function useActiveScroll<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  topOffset: number = 80
) {
  useEffect(() => {
    const element = ref?.current;
    const listener = () => {
      if (window.scrollY > topOffset) {
        element?.classList.add('is-scrolling');
      } else {
        element?.classList.remove('is-scrolling');
      }
    };
    document.addEventListener('scroll', listener);
    return () => {
      document.removeEventListener('scroll', listener);
    };
  }, [ref, topOffset]); // Добавляем ref и topOffset в массив зависимостей
}
