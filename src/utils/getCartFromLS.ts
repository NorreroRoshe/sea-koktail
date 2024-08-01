"use client"

import { CartItem } from "@/types/Cart/cart.types";
import {
  calcTotalCount,
  calcTotalPrice,
  calcTruePrice,
} from "./calcTotalPrice";
import Cookies from 'js-cookie';

// export const setLocalStorage = (id: string, obj: Object) => {
//   const data =localStorage.setItem()
// }

// export const getLocalStorage = (id: string) => {
//   const data = localStorage.getItem(id);
//   const
// };

export const getCartFromLS = () => {
  if (typeof window !== 'undefined') {
    const data = Cookies.get("cart");
    const items = data ? JSON.parse(data) : [];
    // const totalDiscountPrice = calcTotalPrice(items);
    const totalDiscountPrice = 0;
    const totalCount = calcTotalCount(items);
    const totalPrice = calcTruePrice(items);
    
    return {
      items: items as CartItem[],
      totalDiscountPrice,
      totalCount,
      totalPrice,
    };
  }
};
